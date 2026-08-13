import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, Eye, EyeOff, Loader2 } from "lucide-react";
import {
  listAllProducts,
  deleteProduct,
  toggleProductAvailable,
} from "../../lib/api/products";
import type { Product } from "../../lib/types";
import { useToast } from "../../context/ToastContext";
import ConfirmDialog from "../components/ConfirmDialog";

export default function ProductsListPage() {
  const toast = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = () => {
    setLoading(true);
    listAllProducts()
      .then(setProducts)
      .catch(() => toast.error("No se pudieron cargar los productos."))
      .finally(() => setLoading(false));
  };

  useEffect(load, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleToggle = async (p: Product) => {
    setToggling(p.id);
    try {
      await toggleProductAvailable(p.id, !p.available);
      setProducts((prev) =>
        prev.map((x) => (x.id === p.id ? { ...x, available: !x.available } : x))
      );
      toast.success(p.available ? "Producto desactivado." : "Producto activado.");
    } catch {
      toast.error("No se pudo actualizar el estado.");
    } finally {
      setToggling(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteProduct(deleteTarget.id);
      setProducts((prev) => prev.filter((x) => x.id !== deleteTarget.id));
      toast.success("Producto eliminado.");
      setDeleteTarget(null);
    } catch {
      toast.error("No se pudo eliminar el producto.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>
            Productos
          </h1>
          <p className="text-gray-400 text-sm mt-0.5">{products.length} producto(s) en el catálogo.</p>
        </div>
        <Link
          to="/admin/productos/nuevo"
          className="flex items-center gap-2 bg-pink-400 hover:bg-pink-500 text-white text-sm font-semibold px-4 py-2.5 rounded-full shadow-md shadow-pink-100 transition-all"
        >
          <Plus size={16} /> Nuevo producto
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24 text-gray-400 gap-2">
          <Loader2 size={18} className="animate-spin" /> Cargando productos…
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center text-gray-400">
          No hay productos todavía.
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
          {/* Desktop table */}
          <table className="w-full hidden sm:table">
            <thead>
              <tr className="text-left text-xs text-gray-400 uppercase tracking-wide border-b border-gray-100">
                <th className="px-5 py-3 font-semibold">Producto</th>
                <th className="px-5 py-3 font-semibold">Categoría</th>
                <th className="px-5 py-3 font-semibold">Precio</th>
                <th className="px-5 py-3 font-semibold">Estado</th>
                <th className="px-5 py-3 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-11 h-11 rounded-xl object-cover shrink-0 bg-gray-100"
                      />
                      <span className="font-semibold text-gray-800 text-sm">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-500">{p.category || "—"}</td>
                  <td className="px-5 py-3 text-sm font-semibold text-gray-700">
                    {p.price > 0 ? `$${p.price.toLocaleString("es-AR")}` : "A consultar"}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        p.available ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {p.available ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleToggle(p)}
                        disabled={toggling === p.id}
                        title={p.available ? "Desactivar" : "Activar"}
                        className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors disabled:opacity-50"
                      >
                        {p.available ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                      <Link
                        to={`/admin/productos/${p.id}`}
                        title="Editar"
                        className="p-2 rounded-lg text-gray-400 hover:bg-pink-50 hover:text-pink-500 transition-colors"
                      >
                        <Pencil size={16} />
                      </Link>
                      <button
                        onClick={() => setDeleteTarget(p)}
                        title="Eliminar"
                        className="p-2 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile cards */}
          <div className="sm:hidden divide-y divide-gray-50">
            {products.map((p) => (
              <div key={p.id} className="p-4 flex gap-3">
                <img src={p.image} alt={p.name} className="w-14 h-14 rounded-xl object-cover shrink-0 bg-gray-100" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-sm truncate">{p.name}</p>
                  <p className="text-gray-400 text-xs">{p.category || "—"}</p>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="font-bold text-pink-500 text-sm">
                      {p.price > 0 ? `$${p.price.toLocaleString("es-AR")}` : "A consultar"}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        p.available ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {p.available ? "Activo" : "Inactivo"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <button
                      onClick={() => handleToggle(p)}
                      disabled={toggling === p.id}
                      className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100"
                    >
                      {p.available ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                    <Link to={`/admin/productos/${p.id}`} className="p-1.5 rounded-lg text-gray-400 hover:bg-pink-50 hover:text-pink-500">
                      <Pencil size={15} />
                    </Link>
                    <button onClick={() => setDeleteTarget(p)} className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="¿Eliminar producto?"
        message={`Se va a eliminar "${deleteTarget?.name}" del catálogo. Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        danger
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
