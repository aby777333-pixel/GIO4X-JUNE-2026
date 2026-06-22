-- Order bridge: smart-route every order to the best LP and record the decision.
-- AFTER INSERT on orders, fully exception-wrapped so it can NEVER block or alter the
-- order/position/balance flow — it only fills the (previously null) lp_id /
-- lp_fill_price / routing_mode / slippage_pips metadata + logs a routing_decision.
-- (routing_decisions.decision is constrained to a_book/b_book/hybrid; the chosen LP
-- name lives in routing_decisions.reason.)
create or replace function public.fn_orders_smart_route()
returns trigger language plpgsql security definer set search_path = public as $$
declare v_pick jsonb;
begin
  begin
    if NEW.fill_price is null or NEW.fill_price <= 0 then return NEW; end if;
    v_pick := public.fn_lp_pick(NEW.symbol, NEW.direction, NEW.requested_size, NEW.fill_price);
    if v_pick is null then return NEW; end if;

    update public.orders set
      lp_id         = v_pick->>'lp_id',
      lp_fill_price = (v_pick->>'fill_price')::numeric,
      routing_mode  = v_pick->>'routing_mode',
      slippage_pips = (v_pick->>'slippage_pips')::numeric
    where id = NEW.id;

    insert into public.routing_decisions (order_id, symbol, volume, decision, a_book_pct, reason, decided_at)
    values (NEW.id, NEW.symbol, NEW.requested_size,
            coalesce(v_pick->>'routing_mode', 'a_book'),   -- a_book | b_book | hybrid
            (v_pick->>'a_book_pct')::int, v_pick->>'reason', now());
  exception when others then
    null;  -- smart routing is best-effort; never block the order
  end;
  return NEW;
end; $$;

drop trigger if exists trg_orders_smart_route on public.orders;
create trigger trg_orders_smart_route
after insert on public.orders
for each row execute function public.fn_orders_smart_route();

-- Live bridges via pg_cron (extension already enabled on this project):
--   • publish the 5-LP aggregated book every minute
--   • refresh LP heartbeats every minute (redundancy monitor)
-- (guarded so re-running the migration doesn't error on the unique job name)
do $$
begin
  perform cron.schedule('lp-publish-quotes', '* * * * *', 'select public.fn_lp_publish_all();');
exception when others then null; end $$;
do $$
begin
  perform cron.schedule('lp-heartbeat', '* * * * *', 'select public.fn_lp_heartbeat();');
exception when others then null; end $$;
