import { useState } from "react";
import { ShoppingCart, Check, MessageCircle } from "lucide-react";
import type { Product } from "../data/products";
import { CONFIG } from "../data/config";

interface ProductCardProps {
  product: Product;
  onAdd: (p: Product) => void;
}

const TAG_COLORS: Record<string, string> = {
  Popular: "bg-pink-100 text-pink-600",
  Nuevo: "bg-teal-100 text-teal-600",
  Especial: "bg-purple-100 text-purple-600",
  "Sin TACC": "bg-green-100 text-green-600",
  "A pedido": "bg-amber-100 text-amber-600",
};

export default function ProductCard({ product, onAdd }: ProductCardProps) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAdd(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(
    `Hola Evi! Me interesa: ${product.name} 🎂`
  )}`;

  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Tag badge */}
        {product.tag && (
          <span
            className={`absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-full ${
              TAG_COLORS[product.tag] ?? "bg-gray-100 text-gray-600"
            }`}
          >
            {product.tag}
          </span>
        )}

        {/* Not available overlay */}
        {!product.available && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center">
            <span className="bg-white text-gray-500 text-xs font-semibold px-3 py-1 rounded-full shadow">
              Consultar por WhatsApp
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-[11px] font-semibold text-pink-400 uppercase tracking-widest mb-1">
          {product.category}
        </p>
        <h3 className="font-bold text-gray-800 text-base leading-snug mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          {product.name}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          {/* Price */}
          <span className="text-xl font-bold text-pink-500">
            {product.price > 0 ? `$${product.price.toLocaleString("es-AR")}` : "A consultar"}
          </span>

          {/* CTA */}
          {product.available ? (
            <button
              onClick={handleAdd}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                added
                  ? "bg-green-100 text-green-600"
                  : "bg-pink-400 hover:bg-pink-500 text-white shadow-md shadow-pink-100 hover:scale-105"
              }`}
            >
              {added ? (
                <>
                  <Check size={15} /> ¡Listo!
                </>
              ) : (
                <>
                  <ShoppingCart size={15} /> Agregar
                </>
              )}
            </button>
          ) : (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-green-400 hover:bg-green-500 text-white shadow-md transition-all hover:scale-105"
            >
              <MessageCircle size={15} /> Consultar
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
