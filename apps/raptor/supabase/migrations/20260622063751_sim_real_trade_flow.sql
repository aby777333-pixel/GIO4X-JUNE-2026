-- Upgrade the demo flow to drive the REAL trade engine instead of inserting a
-- shortcut closed position. Each tick either OPENS a new market order or CLOSES the
-- oldest open position, both via the real RPCs (real orders + positions + events +
-- realized pnl + balance). Open/close land on different ticks → real durations + a
-- live open book. Impersonates the mapped account's owner so engine auth.uid()
-- ownership checks pass; the portal bridge mirrors the real closed positions.
drop function if exists public.sim_generate_trade();

create function public.sim_generate_trade()
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_account uuid := 'a45318ff-fe29-429b-8020-e17a2cfaff75';   -- bridge-mapped account
  v_user    uuid := '496aa7e2-2a6c-41cd-a8db-f279764727c5';   -- its owner
  v_symbols text[]    := array['XAUUSD','BTCUSD','ETHUSD','EURUSD','GBPUSD','USDJPY','US30','XAGUSD'];
  v_bases   numeric[] := array[2350, 67000, 3450, 1.085, 1.27, 157.0, 39900, 30.5];
  v_open_cnt int;
  v_i int; v_symbol text; v_base numeric; v_dir text; v_size numeric; v_fill numeric;
  v_pos record; v_close numeric; v_move numeric;
begin
  -- Impersonate the account owner so place_market_order / close_position (which read
  -- auth.uid() and verify ownership) execute as if the owner placed the trade.
  perform set_config('request.jwt.claims', json_build_object('sub', v_user::text)::text, true);

  select count(*) into v_open_cnt
  from public.positions where account_id = v_account and status = 'open';

  if v_open_cnt > 0 and (v_open_cnt >= 6 or random() < 0.5) then
    -- CLOSE the oldest open position at a price drifted from its open.
    select id, symbol, direction, open_price into v_pos
    from public.positions
    where account_id = v_account and status = 'open'
    order by opened_at asc limit 1;

    v_move  := (random() - 0.45) * 0.012;   -- slight upward bias
    v_close := round((v_pos.open_price * (1 + v_move))::numeric, 5);
    return public.close_position(v_pos.id, v_close);
  else
    -- OPEN a new market order.
    v_i      := 1 + floor(random() * 8)::int;
    v_symbol := v_symbols[v_i];
    v_base   := v_bases[v_i];
    v_dir    := case when random() < 0.5 then 'BUY' else 'SELL' end;
    v_size   := (array[0.01,0.02,0.05,0.10])[1 + floor(random() * 4)::int];
    v_fill   := round((v_base * (1 + (random() - 0.5) * 0.004))::numeric, 5);
    return public.place_market_order(v_account, v_symbol, v_dir, v_size, null, null, 'sim-flow', v_fill);
  end if;
end;
$$;

revoke all on function public.sim_generate_trade() from public, anon;
