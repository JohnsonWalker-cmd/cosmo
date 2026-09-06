-- Closes a gap Bugbot flagged on 0001: the guest insert policy on `orders`
-- allowed `with check (true)`, and `status` defaulted to 'paid'. That let
-- anyone holding the public anon key insert a row that *looked* like a real,
-- paid pickup order — with no Paystack transaction behind it.
--
-- Fix: orders now default to 'pending' and guests may only ever insert a
-- 'pending' row. Only an authenticated admin (or, later, a server-side
-- function verifying a Paystack transaction) can move an order to 'paid'.
-- Checkout (feat/checkout) should insert 'pending', then flip it to 'paid'
-- from a trusted context after verifying payment — never from the browser.

alter table public.orders
  drop constraint if exists orders_status_check;

alter table public.orders
  add constraint orders_status_check
  check (status in ('pending', 'paid', 'ready_for_pickup', 'picked_up'));

alter table public.orders
  alter column status set default 'pending';

drop policy if exists "Guests insert orders" on public.orders;
create policy "Guests insert orders"
  on public.orders for insert
  to anon, authenticated
  with check (status = 'pending');
