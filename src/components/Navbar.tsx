import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, MessageCircle, Menu, X } from "lucide-react";

// Inline Instagram SVG para evitar deprecación de lucide
const IgIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);
import { CONFIG } from "../data/config";

interface NavbarProps {
  cartCount: number;
  onCartOpen: () => void;
}

const NAV_LINKS = [
  { label: "Inicio", to: "/" },
  { label: "Productos", to: "/productos" },
  { label: "Nosotros", to: "/nosotros" },
  { label: "Contacto", to: "/contacto" },
];

export default function Navbar({ cartCount, onCartOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMenuOpen(false), [location.pathname]);

  const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-white/80 backdrop-blur-sm shadow-sm"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo compacto en nav */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img
              src={CONFIG.logoUrl}
              alt={CONFIG.businessName}
              className="h-10 w-auto drop-shadow-sm"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </Link>

          {/* Links – escritorio */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    location.pathname === to
                      ? "bg-pink-100 text-pink-600"
                      : "text-gray-600 hover:bg-pink-50 hover:text-pink-500"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Acciones – escritorio */}
          <div className="hidden md:flex items-center gap-2">
            {/* Instagram */}
            {CONFIG.instagramUrl && (
              <a
                href={CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="p-2 rounded-full text-gray-500 hover:text-pink-500 hover:bg-pink-50 transition-colors"
              >
                <IgIcon size={20} />
              </a>
            )}

            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="WhatsApp"
              className="p-2 rounded-full text-gray-500 hover:text-green-500 hover:bg-green-50 transition-colors"
            >
              <MessageCircle size={20} />
            </a>

            {/* Carrito */}
            <button
              onClick={onCartOpen}
              title="Ver carrito"
              className="relative p-2 rounded-full text-gray-500 hover:text-pink-500 hover:bg-pink-50 transition-colors"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-pink-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-0.5">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile: carrito + hamburguesa */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onCartOpen}
              className="relative p-2 rounded-full text-gray-500 hover:text-pink-500 transition-colors"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-pink-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-0.5">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-full text-gray-500 hover:text-pink-500 transition-colors"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-pink-100 py-3 space-y-1 pb-4">
            {NAV_LINKS.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  location.pathname === to
                    ? "bg-pink-100 text-pink-600"
                    : "text-gray-600 hover:bg-pink-50 hover:text-pink-500"
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="flex gap-3 px-4 pt-3">
              {CONFIG.instagramUrl && (
                <a
                  href={CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-pink-500"
                >
                  <IgIcon size={18} /> Instagram
                </a>
              )}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-green-500"
              >
                <MessageCircle size={18} /> WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
