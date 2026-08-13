import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cake, CheckCircle2, XCircle, Tags, Plus } from "lucide-react";
import { listAllProducts } from "../../lib/api/products";
import { listAllCategories } from "../../lib/api/categories";
import { useToast } from "../../context/ToastContext";

interface Stats {
  total: number;
  active: number;
  inactive: number;
  categories: number;
}

const CARDS: {
  key: keyof Stats;
  label: string;
  icon: typeof Cake;
  iconBg: string;
  iconColor: string;
}[] = [
  { key: "total", label: "Productos totales", icon: Cake, iconBg: "bg-pink-100", iconColor: "text-pink-500" },
  { key: "active", label: "Activos", icon: CheckCircle2, iconBg: "bg-green-100", iconColor: "text-green-500" },
  { key: "inactive", label: "Inactivos", icon: XCircle, iconBg: "bg-gray-100", iconColor: "text-gray-500" },
  { key: "categories", label: "Categorías", icon: Tags, iconBg: "bg-teal-100", iconColor: "text-teal-500" },
];

export default function DashboardPage() {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({ total: 0, active: 0, inactive: 0, categories: 0 });

  useEffect(() => {
    let active = true;
    Promise.all([listAllProducts(), listAllCategories()])
      .then(([products, categories]) => {
        if (!active) return;
        setStats({
          total: products.length,
          active: products.filter((p) => p.available).length,
          inactive: products.filter((p) => !p.available).length,
          categories: categories.length,
        });
      })
      .catch(() => toast.error("No se pudieron cargar las estadísticas."))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>
            Dashboard
          </h1>
          <p className="text-gray-400 text-sm mt-0.5">Resumen general de tu catálogo.</p>
        </div>
        <Link
          to="/admin/productos/nuevo"
          className="flex items-center gap-2 bg-pink-400 hover:bg-pink-500 text-white text-sm font-semibold px-4 py-2.5 rounded-full shadow-md shadow-pink-100 transition-all"
        >
          <Plus size={16} /> Nuevo producto
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {CARDS.map(({ key, label, icon: Icon, iconBg, iconColor }) => (
          <div key={key} className="bg-white rounded-3xl p-5 shadow-sm">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-3 ${iconBg} ${iconColor}`}>
              <Icon size={20} />
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {loading ? "…" : stats[key]}
            </p>
            <p className="text-gray-400 text-xs mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mt-8">
        <Link
          to="/admin/productos"
          className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-500 flex items-center justify-center">
            <Cake size={22} />
          </div>
          <div>
            <p className="font-bold text-gray-800">Gestionar productos</p>
            <p className="text-gray-400 text-sm">Editar, activar o eliminar</p>
          </div>
        </Link>
        <Link
          to="/admin/categorias"
          className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-500 flex items-center justify-center">
            <Tags size={22} />
          </div>
          <div>
            <p className="font-bold text-gray-800">Gestionar categorías</p>
            <p className="text-gray-400 text-sm">Crear, editar u ocultar</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
