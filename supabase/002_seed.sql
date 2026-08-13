-- ============================================================
-- Evi's Cakes — Datos iniciales
-- Migra el catálogo que hoy está hardcodeado en src/data/products.ts
-- Correr DESPUÉS de 001_schema.sql
-- ============================================================

insert into categories (name, slug, "order") values
  ('Tortas', 'tortas', 1),
  ('Cupcakes', 'cupcakes', 2),
  ('Postres', 'postres', 3),
  ('Especiales', 'especiales', 4),
  ('Sin TACC', 'sin-tacc', 5)
on conflict (slug) do nothing;

insert into products (name, description, price, image, category_id, tag, available, "order")
select v.name, v.description, v.price, v.image, c.id, v.tag, v.available, v.ord
from (values
  ('Torta Red Velvet', 'Húmedo bizcocho rojo con crema de queso, decorada a mano con flores de fondant.', 8500, 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=600&q=80', 'tortas', 'Popular', true, 1),
  ('Torta Matilda', 'Tres capas de bizcochuelo de cacao con ganache intenso.', 29000, 'https://i.imgur.com/e7xxP5w.jpeg', 'tortas', null, true, 2),
  ('Budines Personalizados', 'Esponjosos budines de vainilla con frosting de limon, semillas de amapola y chispas de colores.', 6000, 'https://i.imgur.com/LKOKNY6.jpeg', 'cupcakes', 'Nuevo', true, 3),
  ('Torta Helada Oreo', 'Nuestro clásico, Oreo en versión helada con queso crema y dulce de leche.', 36000, 'https://i.imgur.com/WCbO59e.jpeg', 'tortas', null, true, 4),
  ('Cheesecake de Frutos Rojos', 'Base de galletita, relleno cremoso de queso y coulis de berries artesanal.', 13000, 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&q=80', 'postres', 'Nuevo', true, 5),
  ('Brownie', 'Intenso brownie de chocolate con remolinos de dulce de leche y nueces. Por unidad.', 950, 'https://i.imgur.com/DRfXVHN.jpeg', 'postres', null, true, 6),
  ('Torta Naked Floral', 'Torta semidesnuda con flores naturales comestibles y crema batida artesanal.', 10500, 'https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=600&q=80', 'especiales', 'Especial', true, 7),
  ('Torta Personalizada', 'Diseñamos la torta de tus sueños. Consultanos por WhatsApp para el presupuesto.', 0, 'https://i.imgur.com/3GU2I62.jpeg', 'especiales', 'A pedido', true, 8),
  ('Alfajores Artesanales', 'Rellenos de dulce de leche repostero y bañados en chocolate (opcional con nueces). Por caja de 6.', 8800, 'https://i.imgur.com/WmurEhL.jpeg', 'postres', null, true, 9),
  ('Lemon Pie', 'Liviano y fresco, con crema de limón y ralladura confitada.', 24000, 'https://i.imgur.com/kAaueqh.jpeg', 'tortas', 'Nuevo', true, 10),
  ('Torta de Zanahoria', 'Clásica torta húmeda de zanahoria con nueces y frosting de queso crema.', 15000, 'https://i.blogs.es/45ba14/carrot-cake-fitness1/1200_900.jpg', 'tortas', null, true, 11),
  ('Cookie Monster', 'Mega cookies de vainilla con chips de chocolate y crema de Oreo. Por unidad.', 1100, 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=80', 'postres', null, true, 12),
  ('Tarta de Frutilla y Crema', 'Masa sable, frutillas frescas, dulce de leche y crema. Por unidad.', 11000, 'https://i.imgur.com/dzB10ya.jpeg', 'tortas', null, true, 13),
  ('Chipa', 'Fecula de mandioca, extra queso!! Por Docena.', 5000, 'https://i.imgur.com/yaulWOh.jpeg', 'sin-tacc', 'Nuevo', true, 14),
  ('Alfajores de Maicena', 'Maizena, dulce de leche y coco rayado. Por Docena.', 4000, 'https://i.imgur.com/HWigVQy.jpeg', 'sin-tacc', 'Nuevo', true, 15)
) as v(name, description, price, image, category_slug, tag, available, ord)
join categories c on c.slug = v.category_slug;
