import { useEffect, useRef, useState, type FormEvent } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Upload, Loader2, ImageOff } from "lucide-react";
import { listAllProducts, createProduct, updateProduct } from "../../lib/api/products";
import type { ProductInput } from "../../lib/api/products";
import { listAllCategories } from "../../lib/api/categories";
import type { CategoryRecord } from "../../lib/types";
import { uploadProductImage } from "../../lib/api/storage";
import { useToast } from "../../context/ToastContext";

const TAG_SUGGESTIONS = ["Popular", "Nuevo", "Especial", "Sin TACC", "A pedido"];

const EMPTY: ProductInput = {
  name: "",
  description: "",
  price: 0,
  image: "",
  category_id: null,
  tag: "",
  available: true,
  order: 0,
};

export default function ProductFormPage() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [categories, setCategories] = useState<CategoryRecord[]>([]);
  const [form, setForm] = useState<ProductInput>(EMPTY);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const cats = await listAllCategories();
        if (!active) return;
        setCategories(cats);

        if (isEdit) {
          const products = await listAllProducts();
          const existing = products.find((p) => p.id === id);
          if (!active) return;
          if (!existing) {
            setNotFound(true);
          } else {
            setForm({
              name: existing.name,
              description: existing.description,
              price: existing.price,
              image: existing.image,
              category_id: existing.category_id,
              tag: existing.tag ?? "",
              available: existing.available,
              order: existing.order,
            });
          }
        } else if (cats.length > 0) {
          setForm((f) => ({ ...f, category_id: cats[0].id }));
        }
      } catch {
        toast.error("No se pudo cargar la información.");
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadProductImage(file);
      setForm((f) => ({ ...f, image: url }));
      toast.success("Imagen subida.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se pudo subir la imagen.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return toast.error("El nombre es obligatorio.");
    if (form.price < 0) return toast.error("El precio no puede ser negativo.");

    setSaving(true);
    try {
      const input: ProductInput = { ...form, tag: form.tag?.trim() || null };
      if (isEdit) {
        await updateProduct(id!, input);
        toast.success("Producto actualizado.");
      } else {
        await createProduct(input);
        toast.success("Producto creado.");
      }
      navigate("/admin/productos");
    } catch {
      toast.error("No se pudo guardar el producto.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-gray-400 gap-2">
        <Loader2 size={18} className="animate-spin" /> Cargando…
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center">
        <p className="text-gray-500 mb-4">Ese producto no existe.</p>
        <Link to="/admin/productos" className="text-pink-500 font-semibold text-sm">
          ← Volver a productos
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        to="/admin/productos"
        className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 mb-4"
      >
        <ArrowLeft size={15} /> Volver a productos
      </Link>

      <h1 className="text-2xl font-bold text-gray-800 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
        {isEdit ? "Editar producto" : "Nuevo producto"}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm p-6 sm:p-8 space-y-6 max-w-2xl">
        {/* Imagen */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Imagen</label>
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 rounded-2xl bg-gray-100 overflow-hidden shrink-0 flex items-center justify-center">
              {form.image ? (
                <img src={form.image} alt="" className="w-full h-full object-cover" />
              ) : (
                <ImageOff size={22} className="text-gray-300" />
              )}
            </div>
            <div className="flex-1">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                onChange={handleFileSelect}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-semibold px-4 py-2.5 rounded-xl cursor-pointer transition-colors"
              >
                {uploading ? <Loader2 size={15} className="animate-spin" /> : <Upload size={15} />}
                {uploading ? "Subiendo…" : "Subir imagen"}
              </label>
              <p className="text-xs text-gray-400 mt-2">JPG, PNG, WEBP o GIF. Máx. 5MB.</p>
              <input
                type="url"
                value={form.image}
                onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                placeholder="o pegá una URL de imagen"
                className="mt-2 w-full text-xs px-3 py-2 bg-gray-50 rounded-lg text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-200"
              />
            </div>
          </div>
        </div>

        {/* Nombre */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-200"
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Descripción</label>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-200 resize-none"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Precio */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Precio ($)</label>
            <input
              type="number"
              min={0}
              step="1"
              value={form.price}
              onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))}
              className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-200"
            />
            <p className="text-xs text-gray-400 mt-1.5">Dejá 0 para mostrar "A consultar".</p>
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Categoría</label>
            <select
              value={form.category_id ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, category_id: e.target.value || null }))}
              className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-200"
            >
              <option value="">Sin categoría</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                  {!c.active ? " (oculta)" : ""}
                </option>
              ))}
            </select>
          </div>

          {/* Tag */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Etiqueta (opcional)</label>
            <input
              type="text"
              list="tag-suggestions"
              value={form.tag ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, tag: e.target.value }))}
              placeholder="Ej: Nuevo, Popular…"
              className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-200"
            />
            <datalist id="tag-suggestions">
              {TAG_SUGGESTIONS.map((t) => (
                <option key={t} value={t} />
              ))}
            </datalist>
          </div>

          {/* Orden */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Orden de visualización</label>
            <input
              type="number"
              value={form.order}
              onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) }))}
              className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-200"
            />
            <p className="text-xs text-gray-400 mt-1.5">Menor número aparece primero.</p>
          </div>
        </div>

        {/* Disponible */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.available}
            onChange={(e) => setForm((f) => ({ ...f, available: e.target.checked }))}
            className="w-5 h-5 rounded accent-pink-500"
          />
          <span className="text-sm font-semibold text-gray-700">
            Producto activo (visible en la web)
          </span>
        </label>

        <div className="flex gap-3 pt-2">
          <Link
            to="/admin/productos"
            className="flex-1 text-center py-3 rounded-xl text-sm font-semibold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={saving || uploading}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white bg-pink-400 hover:bg-pink-500 shadow-md shadow-pink-100 transition-all disabled:opacity-60"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : null}
            {saving ? "Guardando…" : isEdit ? "Guardar cambios" : "Crear producto"}
          </button>
        </div>
      </form>
    </div>
  );
}
