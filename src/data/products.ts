// ============================================================
// PRODUCTOS – editá libremente este archivo para agregar,
// modificar o quitar productos del catálogo.
// ============================================================

export type Category = "Tortas" | "Cupcakes" | "Postres" | "Especiales" | "Sin TACC";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;       // URL pública de la imagen
  category: Category;
  tag?: string;        // Ej: "Nuevo", "Popular", "Sin TACC"
  available: boolean;  // false = se muestra pero sin botón de agregar
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Torta Red Velvet",
    description: "Húmedo bizcocho rojo con crema de queso, decorada a mano con flores de fondant.",
    price: 8500,
    image: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=600&q=80",
    category: "Tortas",
    tag: "Popular",
    available: true,
  },
  {
    id: 2,
    name: "Torta Matilda",
    description: "Tres capas de bizcochuelo de cacao con ganache intenso.",
    price: 7900,
    image: "https://i.imgur.com/e7xxP5w.jpeg",
    category: "Tortas",
    available: true,
  },
  {
    id: 3,
    name: "Budines Personalizados",
    description: "Esponjosos budines de vainilla con frosting de limon, semillas de amapola y chispas de colores.",
    price: 6000,
    image: "https://i.imgur.com/LKOKNY6.jpeg",
    category: "Cupcakes",
    tag: "Nuevo",
    available: true,
  },
  {
    id: 4,
    name: "Torta Helada Oreo",
    description: "Nuestro clásico, Oreo en versión helada con queso crema y dulce de leche.",
    price: 36000,
    image: "https://i.imgur.com/WCbO59e.jpeg",
    category: "Tortas",
    available: true,
  },
  {
    id: 5,
    name: "Cheesecake de Frutos Rojos",
    description: "Base de galletita, relleno cremoso de queso y coulis de berries artesanal.",
    price: 6500,
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&q=80",
    category: "Postres",
    tag: "Nuevo",
    available: true,
  },
  {
    id: 6,
    name: "Brownie",
    description: "Intenso brownie de chocolate con remolinos de dulce de leche y nueces. Por unidad.",
    price: 950,
    image: "https://i.imgur.com/DRfXVHN.jpeg",
    category: "Postres",
    available: true,
  },
  {
    id: 7,
    name: "Torta Naked Floral",
    description: "Torta semidesnuda con flores naturales comestibles y crema batida artesanal.",
    price: 10500,
    image: "https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=600&q=80",
    category: "Especiales",
    tag: "Especial",
    available: true,
  },
  {
    id: 8,
    name: "Torta Personalizada",
    description: "Diseñamos la torta de tus sueños. Consultanos por WhatsApp para el presupuesto.",
    price: 0,
    image: "https://i.imgur.com/3GU2I62.jpeg",
    category: "Especiales",
    tag: "A pedido",
    available: true,
  },
  {
    id: 9,
    name: "Alfajores Artesanales",
    description: "Rellenos de dulce de leche repostero y bañados en chocolate (opcional con nueces). Por caja de 6.",
    price: 8800,
    image: "https://i.imgur.com/WmurEhL.jpeg",
    category: "Postres",
    available: true,
  },
  {
    id: 10,
    name: "Lemon Pie",
    description: "Liviano y fresco, con crema de limón y ralladura confitada.",
    price: 24000,
    image: "https://i.imgur.com/kAaueqh.jpeg",
    category: "Tortas",
    tag: "Nuevo",
    available: true,
  },
  {
    id: 11,
    name: "Torta de Zanahoria",
    description: "Clásica torta húmeda de zanahoria con nueces y frosting de queso crema.",
    price: 15000,
    image: "https://i.blogs.es/45ba14/carrot-cake-fitness1/1200_900.jpg",
    category: "Tortas",
    available: true,
  },
  {
    id: 12,
    name: "Cookie Monster",
    description: "Mega cookies de vainilla con chips de chocolate y crema de Oreo. Por unidad.",
    price: 1100,
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=80",
    category: "Postres",
    available: true,
  },
  {
    id: 13,
    name: "Tarta de Frutilla y Crema",
    description: "Masa sable, frutillas frescas, dulce de leche y crema. Por unidad.",
    price: 11000,
    image: "https://i.imgur.com/dzB10ya.jpeg",
    category: "Tortas",
    available: true,
  },
  {
    id: 14,
    name: "Chipa",
    description: "Fecula de mandioca, extra queso!! Por Docena.",
    price: 5000,
    image: "https://i.imgur.com/yaulWOh.jpeg",
    category: "Sin TACC",
    tag: "Nuevo",
    available: true,
  },
  {
    id: 15,
    name: "Alfajores de Maicena",
    description: "Maizena, dulce de leche y coco rayado. Por Docena.",
    price: 4000,
    image: "https://i.imgur.com/HWigVQy.jpeg",
    category: "Sin TACC",
    tag: "Nuevo",
    available: true,
  },
];

// ============================================================
// CATEGORÍAS disponibles (se usan en el filtro de productos)
// ============================================================
export const CATEGORIES: ("Todas" | Category)[] = [
  "Todas",
  "Tortas",
  "Cupcakes",
  "Postres",
  "Especiales",
  "Sin TACC"
];
