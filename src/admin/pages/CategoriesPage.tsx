import { useEffect, useState, type FormEvent } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff, Loader2, X } from "lucide-react";
import {
  listAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  toggleCategoryActive,
  countProductsByCategory,
} from "../../lib/api/categories";
import type { CategoryRecord } from "../../lib/types";
import { useToast } from "../../context/ToastContext";
import ConfirmDialog from "../components/ConfirmDialog";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // quita acentos (tildes)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

interface FormState {
  id: string | null;
  name: string;
  slug: string;
  order: number;
}

const EMPTY_FORM: FormState = { id: null, name: "", slug: "", order: 0 };

export default function CategoriesPage() {
  const toast = useToast();
  const [categories, setCategories] = useState<CategoryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [slugTouched, setSlugTouched] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<CategoryRecord | null>(null);
  const [deleteWarning, setDeleteWarning] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = () => {
    setLoading(true);
    listAllCategories()
      .then(setCategories)
      .catch(() => toast.error("No se pudieron cargar las categorías."))
      .finally(() => setLoading(false));
  };

  useEffect(load, []); // eslint-disable-line react-hooks/exhaustive-deps

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setSlugTouched(false);
    setFormOpen(true);
  };

  const openEdit = (c: CategoryRecord) => {
    setForm({ id: c.id, name: c.name, slug: c.slug, order: c.order });
    setSlugTouched(true);
    setFormOpen(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return toast.error("El nombre es obligatorio.");
    const slug = form.slug.trim() || slugify(form.name);

    setSaving(true);
    try {
      if (form.id) {
        await updateCategory(form.id, { name: form.name, slug, active: true, order: form.order });
        toast.success("Categoría actualizada.");
      } else {
        await createCategory({ name: form.name, slug, active: true, order: form.order });
        toast.success("Categoría creada.");
      }
      setFormOpen(false);
      load();
    } catch {
      toast.error("No se pudo guardar la categoría. Verificá que el slug no esté repetido.");
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (c: CategoryRecord) => {
    setToggling(c.id);
    try {
      await toggleCategoryActive(c.id, !c.active);
      setCategories((prev) => prev.map((x) => (x.id === c.id ? { ...x, active: !x.active } : x)));
      toast.success(c.active ? "Categoría oculta." : "Categoría activada.");
    } catch {
      toast.error("No se pudo actualizar el estado.");
    } finally {
      setToggling(null);
    }
  };

  const askDelete = async (c: CategoryRecord) => {
    setDeleteTarget(c);
    const count = await countProductsByCategory(c.id).catch(() => 0);
    setDeleteWarning(
      count > 0
        ? `${count} producto(s) usan esta categoría y quedarán sin categoría asignada.`
        : null
    );
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteCategory(deleteTarget.id);
      setCategories((prev) => prev.filter((x) => x.id !== deleteTarget.id));
      toast.success("Categoría eliminada.");
      setDeleteTarget(null);
    } catch {
      toast.error("No se pudo eliminar la categoría.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>
            Categorías
          </h1>
          <p className="text-gray-400 text-sm mt-0.5">{categories.length} categoría(s).</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-pink-400 hover:bg-pink-500 text-white text-sm font-semibold px-4 py-2.5 rounded-full shadow-md shadow-pink-100 transition-all"
        >
          <Plus size={16} /> Nueva categoría
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24 text-gray-400 gap-2">
          <Loader2 size={18} className="animate-spin" /> Cargando categorías…
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-sm divide-y divide-gray-50">
          {categories.map((c) => (
            <div key={c.id} className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="font-semibold text-gray-800 text-sm">{c.name}</p>
                <p className="text-gray-400 text-xs">/{c.slug} · orden {c.order}</p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    c.active ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {c.active ? "Activa" : "Oculta"}
                </span>
                <button
                  onClick={() => handleToggle(c)}
                  disabled={toggling === c.id}
                  title={c.active ? "Ocultar" : "Activar"}
                  className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors disabled:opacity-50"
                >
                  {c.active ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <button
                  onClick={() => openEdit(c)}
                  title="Editar"
                  className="p-2 rounded-lg text-gray-400 hover:bg-pink-50 hover:text-pink-500 transition-colors"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => askDelete(c)}
                  title="Eliminar"
                  className="p-2 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {categories.length === 0 && (
            <div className="p-12 text-center text-gray-400">No hay categorías todavía.</div>
          )}
        </div>
      )}

      {/* Form modal */}
      {formOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setFormOpen(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800 text-lg">
                {form.id ? "Editar categoría" : "Nueva categoría"}
              </h3>
              <button onClick={() => setFormOpen(false)} className="p-1.5 rounded-full text-gray-400 hover:bg-gray-100">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Nombre</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    setForm((f) => ({ ...f, name, slug: slugTouched ? f.slug : slugify(name) }));
                  }}
                  className="w-full px-3.5 py-2.5 bg-gray-50 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-200"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Slug (URL interna)</label>
                <input
                  type="text"
                  required
                  value={form.slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    setForm((f) => ({ ...f, slug: e.target.value }));
                  }}
                  className="w-full px-3.5 py-2.5 bg-gray-50 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-200"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Orden</label>
                <input
                  type="number"
                  value={form.order}
                  onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) }))}
                  className="w-full px-3.5 py-2.5 bg-gray-50 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-200"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-pink-400 hover:bg-pink-500 transition-colors disabled:opacity-60"
                >
                  {saving ? "Guardando…" : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="¿Eliminar categoría?"
        message={
          deleteWarning
            ? `${deleteWarning} Esta acción no se puede deshacer.`
            : `Se va a eliminar "${deleteTarget?.name}". Esta acción no se puede deshacer.`
        }
        confirmLabel="Eliminar"
        danger
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
