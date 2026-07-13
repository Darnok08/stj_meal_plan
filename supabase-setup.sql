-- ═══════════════════════════════════════════════════════════
--  KUCHNIA — konfiguracja bazy danych
--  Wklej CAŁOŚĆ tego pliku w Supabase → SQL Editor → Run
--  (instrukcja: README-WDROZENIE.md, KROK 1)
-- ═══════════════════════════════════════════════════════════

-- 1. Tabela na wspólne dane (plan, przepisy, zakupy, zamrażalnik…)
create table if not exists public.kitchen_state (
  household   text        not null,
  key         text        not null,
  data        jsonb,
  client_id   text,
  updated_at  timestamptz default now(),
  primary key (household, key)
);

-- 2. Włącz ochronę: dostęp tylko dla zalogowanych
alter table public.kitchen_state enable row level security;

-- 3. Zalogowani użytkownicy mogą czytać i zapisywać wspólne dane
drop policy if exists "zalogowani czytaja" on public.kitchen_state;
create policy "zalogowani czytaja"
  on public.kitchen_state for select
  to authenticated
  using (true);

drop policy if exists "zalogowani dodaja" on public.kitchen_state;
create policy "zalogowani dodaja"
  on public.kitchen_state for insert
  to authenticated
  with check (true);

drop policy if exists "zalogowani aktualizuja" on public.kitchen_state;
create policy "zalogowani aktualizuja"
  on public.kitchen_state for update
  to authenticated
  using (true)
  with check (true);

-- 4. Włącz synchronizację na żywo (żebyście widzieli zmiany drugiej osoby od razu)
alter publication supabase_realtime add table public.kitchen_state;

-- Gotowe. Powinieneś zobaczyć "Success. No rows returned".
