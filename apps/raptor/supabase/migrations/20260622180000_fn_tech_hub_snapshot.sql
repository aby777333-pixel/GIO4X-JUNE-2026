-- One-call snapshot for the Tech Hub admin console (portal /staff/tech-hub):
-- LP connectors + health, the aggregated (NBBO) book, recent smart-routing
-- decisions, and the live bridges (pg_cron jobs + last run). SECURITY DEFINER so
-- it can read cron.* as owner. The portal reaches this via the terminal service
-- key stored in the portal's bridge_secrets.
create or replace function public.fn_tech_hub()
returns jsonb language plpgsql security definer set search_path = public as $$
declare v_lps jsonb; v_book jsonb; v_routes jsonb; v_bridges jsonb;
begin
  select coalesce(jsonb_agg(jsonb_build_object(
           'name', name, 'connector', connector, 'status', status,
           'markup_bps', (config->>'markup_bps'), 'tier', (config->>'tier'),
           'fill_rate', fill_rate, 'avg_latency_ms', avg_latency_ms, 'uptime_pct', uptime_pct,
           'healthy', (status = 'active'), 'last_heartbeat', last_heartbeat
         ) order by (config->>'markup_bps')::numeric nulls last), '[]'::jsonb)
  into v_lps from public.liquidity_providers;

  select coalesce(jsonb_agg(jsonb_build_object('symbol', symbol, 'bid', bid, 'ask', ask, 'spread', spread, 'ts', "timestamp")
           order by symbol), '[]'::jsonb)
  into v_book from public.price_feeds where source = 'aggregated';

  select coalesce(jsonb_agg(t), '[]'::jsonb) into v_routes
  from (select symbol, volume, decision, a_book_pct, reason, decided_at
        from public.routing_decisions order by decided_at desc limit 25) t;

  select coalesce(jsonb_agg(jsonb_build_object(
           'name', j.jobname, 'schedule', j.schedule, 'active', j.active,
           'last_run', d.start_time, 'last_status', d.status
         ) order by j.jobname), '[]'::jsonb)
  into v_bridges
  from cron.job j
  left join lateral (
    select start_time, status from cron.job_run_details r
    where r.jobid = j.jobid order by r.start_time desc limit 1
  ) d on true
  where j.jobname in ('lp-publish-quotes','lp-heartbeat');

  return jsonb_build_object(
    'generated_at', now(),
    'lps', v_lps,
    'book', v_book,
    'recent_routes', v_routes,
    'bridges', v_bridges,
    'stats', jsonb_build_object(
      'lp_total',         (select count(*) from public.liquidity_providers),
      'lp_healthy',       (select count(*) from public.liquidity_providers where status = 'active'),
      'symbols_streamed', (select count(distinct symbol) from public.price_feeds where source = 'aggregated'),
      'routes_total',     (select count(*) from public.routing_decisions)
    )
  );
end; $$;

revoke all on function public.fn_tech_hub() from public, anon;
grant execute on function public.fn_tech_hub() to authenticated, service_role;
