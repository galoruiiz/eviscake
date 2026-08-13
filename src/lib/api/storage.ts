import { supabase } from "../supabaseClient";

const BUCKET = "product-images";
const MAX_SIZE_MB = 5;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function uploadProductImage(file: File): Promise<string> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Formato no soportado. Usá JPG, PNG, WEBP o GIF.");
  }
  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    throw new Error(`La imagen supera los ${MAX_SIZE_MB}MB.`);
  }

  const ext = file.name.split(".").pop() || "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
