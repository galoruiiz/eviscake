-- ============================================================
-- Evis Cake — Políticas de storage
-- Correr DESPUÉS de crear el bucket "product-images" a mano
-- desde Storage → New bucket (marcado como Public).
--
-- Nota: NO se agrega policy de SELECT — el bucket ya es público,
-- así que las imágenes se sirven por URL directa sin pasar por RLS.
-- Agregar un SELECT policy permitiría además LISTAR todos los
-- archivos del bucket vía API, algo innecesario y que Supabase
-- marca como advertencia de seguridad.
-- ============================================================

drop policy if exists "public_read_product_images" on storage.objects;

drop policy if exists "admin_upload_product_images" on storage.objects;
create policy "admin_upload_product_images" on storage.objects
  for insert with check (bucket_id = 'product-images' and is_admin());

drop policy if exists "admin_update_product_images" on storage.objects;
create policy "admin_update_product_images" on storage.objects
  for update using (bucket_id = 'product-images' and is_admin());

drop policy if exists "admin_delete_product_images" on storage.objects;
create policy "admin_delete_product_images" on storage.objects
  for delete using (bucket_id = 'product-images' and is_admin());
