import { supabase } from "../supabaseClient";
import type { CategoryRecord } from "../types";

const SELECT = "id, name, slug, active, order";

export async function listPublicCategories(): Promise<CategoryRecord[]> {
  const { data, error } = await supabase
    .from("categories")
    .select(SELECT)
    .eq("active", true)
    .order("order", { ascending: true });
  if (error) throw error;
  return data as CategoryRecord[];
}

export async function listAllCategories(): Promise<CategoryRecord[]> {
  const { data, error } = await supabase
    .from("categories")
    .select(SELECT)
    .order("order", { ascending: true });
  if (error) throw error;
  return data as CategoryRecord[];
}

export interface CategoryInput {
  name: string;
  slug: string;
  active: boolean;
  order: number;
}

export async function createCategory(input: CategoryInput): Promise<void> {
  const { error } = await supabase.from("categories").insert(input);
  if (error) throw error;
}

export async function updateCategory(id: string, input: CategoryInput): Promise<void> {
  const { error } = await supabase.from("categories").update(input).eq("id", id);
  if (error) throw error;
}

export async function deleteCategory(id: string): Promise<void> {
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw error;
}

export async function toggleCategoryActive(id: string, active: boolean): Promise<void> {
  const { error } = await supabase.from("categories").update({ active }).eq("id", id);
  if (error) throw error;
}

export async function countProductsByCategory(categoryId: string): Promise<number> {
  const { count, error } = await supabase
    .from("products")
    .select("id", { count: "exact", head: true })
    .eq("category_id", categoryId);
  if (error) throw error;
  return count ?? 0;
}
