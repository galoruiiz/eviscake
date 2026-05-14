import { Link } from "react-router-dom";
import { MessageCircle, Heart } from "lucide-react";
import { CONFIG } from "../data/config";

// Inline IG icon
const IgIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

export default function Footer() {
  const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <img
              src={CONFIG.logoUrl}
              alt={CONFIG.businessName}
              className="h-16 w-auto mx-auto sm:mx-0 mb-4 opacity-90 drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <p className="text-gray-400 text-sm leading-relaxed">
              {CONFIG.tagline}
            </p>
          </div>

          {/* Links */}
          <div className="text-center">
            <h4 className="font-bold mb-4 text-pink-300 tracking-wide text-sm uppercase">
              Navegación
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Inicio", to: "/" },
                { label: "Productos", to: "/productos" },
                { label: "Nosotros", to: "/nosotros" },
                { label: "Contacto", to: "/contacto" },
              ].map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-gray-400 hover:text-pink-300 transition-colors text-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="text-center sm:text-right">
            <h4 className="font-bold mb-4 text-pink-300 tracking-wide text-sm uppercase">
              Contacto
            </h4>
            <div className="flex gap-3 justify-center sm:justify-end mb-4">
              {CONFIG.instagramUrl && (
                <a
                  href={CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white/10 hover:bg-pink-500 rounded-xl transition-colors"
                  title="Instagram"
                >
                  <IgIcon size={20} />
                </a>
              )}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-white/10 hover:bg-green-500 rounded-xl transition-colors"
                title="WhatsApp"
              >
                <MessageCircle size={20} />
              </a>
            </div>
            <p className="text-gray-400 text-sm">
              Pedidos por WhatsApp
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">{CONFIG.footerText}</p>
          <p className="text-gray-500 text-xs flex items-center gap-1">
            Hecho con <Heart size={12} className="text-pink-400 fill-pink-400" /> para endulzar tu día
          </p>
        </div>
      </div>
    </footer>
  );
}
