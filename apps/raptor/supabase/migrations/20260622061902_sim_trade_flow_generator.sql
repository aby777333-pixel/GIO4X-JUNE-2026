-- Demo trade-flow generator for the GIORAPTOR terminal.
-- Produces realistic CLOSED positions on the bridge-mapped account (NX-100001)
-- so the portal's raptor-trade-bridge mirrors them into public.trades every
-- minute, populating Copy / PAMM / IB engines with live flow.
-- Controllable: disable anytime via  select cron.unschedule('sim-trade-generator');
--
-- NOTE: superseded by 20260622063751_sim_real_trade_flow.sql, which drives the
-- REAL trade engine (place_market_order / close_position) instead of inserting a
-- shortcut closed position. Kept here to mirror the live DB migration history.

create extension if not exists pg_cron;

create or replace function public.sim_generate_trade()
returns uuid
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_account uuid := 'a45318ff-fe29-429b-8020-e17a2cfaff75';   -- mapped raptor account
  v_user    uuid := '496aa7e2-2a6c-41cd-a8db-f279764727c5';   -- its owner
  v_symbols text[]    := array['XAUUSD','BTCUSD','ETHUSD','EURUSD','GBPUSD','USDJPY','US30','XAGUSD'];
  v_bases   numeric[] := array[2350, 67000, 3450, 1.085, 1.27, 157.0, 39900, 30.5];
  v_i       int     := 1 + floor(random()*8)::int;
  v_symbol  text    := v_symbols[v_i];
  v_base    numeric := v_bases[v_i];
  v_dir     text    := case when random() < 0.5 then 'BUY' else 'SELL' end;
  v_size    numeric := (array[0.01,0.02,0.05,0.10])[1 + floor(random()*4)::int];
  v_open    numeric := round((v_base * (1 + (random()-0.5)*0.004))::numeric, 5);
  v_pnl     numeric := round((((random()*200)-90) * v_size * 10)::numeric, 2);  -- slight positive bias
  v_won     boolean := v_pnl >= 0;
  v_up      boolean := (v_dir = 'BUY') = v_won;          -- did price move up?
  v_delta   numeric := random()*0.004 + 0.0005;
  v_close   numeric := round((v_open * (1 + case when v_up then v_delta else -v_delta end))::numeric, 5);
  v_opened  timestamptz := now() - make_interval(mins => (1 + floor(random()*120))::int);
  v_id      uuid;
begin
  insert into public.positions
    (account_id, user_id, symbol, direction, size, open_price, close_price,
     realized_pnl, commission, swap_accrued, status, opened_at, closed_at, comment)
  values
    (v_account, v_user, v_symbol, v_dir, v_size, v_open, v_close,
     v_pnl, round((v_size*0.7)::numeric, 2), 0, 'closed', v_opened, now(), 'sim-flow')
  returning id into v_id;
  return v_id;
end;
$$;

revoke all on function public.sim_generate_trade() from public, anon;
