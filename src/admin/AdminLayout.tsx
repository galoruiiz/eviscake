import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Cake,
  Tags,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const LINKS = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/productos", label: "Productos", icon: Cake, end: false },
  { to: "/admin/categorias", label: "Categorías", icon: Tags, end: false },
];

export default function AdminLayout() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-800">
      {/* Sidebar - desktop */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-white border-r border-gray-100">
        <SidebarContent onLogout={handleLogout} />
      </aside>

      {/* Sidebar - mobile drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute top-0 left-0 h-full w-64 bg-white flex flex-col">
            <SidebarContent
              onLogout={handleLogout}
              onNavigate={() => setSidebarOpen(false)}
            />
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar - mobile */}
        <div className="lg:hidden flex items-center justify-between px-4 h-14 bg-white border-b border-gray-100">
          <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 text-gray-500">
            <Menu size={22} />
          </button>
          <span className="font-bold text-gray-800 text-sm">Panel Admin</span>
          <div className="w-8" />
        </div>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function SidebarContent({
  onLogout,
  onNavigate,
}: {
  onLogout: () => void;
  onNavigate?: () => void;
}) {
  return (
    <>
      <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100">
        <div>
          <p className="font-bold text-gray-800 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Evis Cake
          </p>
          <p className="text-[11px] text-pink-400 tracking-widest font-medium uppercase">
            Panel Admin
          </p>
        </div>
        <button
          onClick={onNavigate}
          className="lg:hidden p-1.5 rounded-full text-gray-400 hover:bg-gray-100"
        >
          <X size={18} />
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {LINKS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-pink-100 text-pink-600"
                  : "text-gray-500 hover:bg-pink-50 hover:text-pink-500"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-gray-100 space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-100 transition-colors"
        >
          <ExternalLink size={18} />
          Ver sitio público
        </a>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut size={18} />
          Cerrar sesión
        </button>
      </div>
    </>
  );
}
