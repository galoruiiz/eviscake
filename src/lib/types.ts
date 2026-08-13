export interface CategoryRecord {
  id: string;
  name: string;
  slug: string;
  active: boolean;
  order: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category_id: string | null;
  category: string; // nombre de la categoría (para mostrar/filtrar en el sitio público)
  tag: string | null;
  available: boolean;
  order: number;
}
