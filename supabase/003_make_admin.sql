-- ============================================================
-- Evis Cake — Alta del usuario administrador
-- Correr DESPUÉS de crear el usuario en:
--   Supabase Dashboard → Authentication → Users → Add user
--   (marcá "Auto Confirm User" para que pueda loguearse ya mismo)
--
-- Reemplazá 'PEGAR-EMAIL-ACA' por el email que usaste al crear
-- el usuario. No hace falta el UUID a mano, lo busca solo.
-- ============================================================

insert into profiles (id, email, role)
select id, email, 'admin'
from auth.users
where email = 'PEGAR-EMAIL-ACA'
on conflict (id) do update set role = 'admin';
