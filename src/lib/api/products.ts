import { supabase } from "../supabaseClient";
import type { Product } from "../types";

interface ProductRow {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category_id: string | null;
  tag: string | null;
  available: boolean;
  order: number;
  categories: { name: string } | null;
}

const SELECT =
  "id, name, description, price, image, category_id, tag, available, order, categories(name)";

function mapRow(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    price: row.price,
    image: row.image,
    category_id: row.category_id,
    category: row.categories?.name ?? "",
    tag: row.tag,
    available: row.available,
    order: row.order,
  };
}

export async function listPublicProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select(SELECT)
    .eq("available", true)
    .order("order", { ascending: true });
  if (error) throw error;
  return (data as unknown as ProductRow[]).map(mapRow);
}

export async function listAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select(SELECT)
    .order("order", { ascending: true });
  if (error) throw error;
  return (data as unknown as ProductRow[]).map(mapRow);
}

export interface ProductInput {
  name: string;
  description: string;
  price: number;
  image: string;
  category_id: string | null;
  tag: string | null;
  available: boolean;
  order: number;
}

export async function createProduct(input: ProductInput): Promise<void> {
  const { error } = await supabase.from("products").insert(input);
  if (error) throw error;
}

export async function updateProduct(id: string, input: ProductInput): Promise<void> {
  const { error } = await supabase.from("products").update(input).eq("id", id);
  if (error) throw error;
}

export async function deleteProduct(id: string): Promise<void> {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
}

export async function toggleProductAvailable(id: string, available: boolean): Promise<void> {
  const { error } = await supabase.from("products").update({ available }).eq("id", id);
  if (error) throw error;
}
