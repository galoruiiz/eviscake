import { X, Trash2, Plus, Minus, ShoppingBag, MessageCircle } from "lucide-react";
import type { CartItem } from "../hooks/useCart";
import { CONFIG } from "../data/config";

interface CartSidebarProps {
  open: boolean;
  onClose: () => void;
  cart: CartItem[];
  cartSubtotal: number;
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
  onRemove: (id: number) => void;
  onClear: () => void;
}

export default function CartSidebar({
  open,
  onClose,
  cart,
  cartSubtotal,
  onIncrement,
  onDecrement,
  onRemove,
  onClear,
}: CartSidebarProps) {
  // Build WhatsApp message with cart contents
  const buildWhatsAppMessage = () => {
    const lines = cart.map(
      (item) =>
        `• ${item.name} x${item.qty} — $${(item.price * item.qty).toLocaleString("es-AR")}`
    );
    const total = `\n*Total: $${cartSubtotal.toLocaleString("es-AR")}*`;
    return encodeURIComponent(
      `Hola Evi! Quiero hacer el siguiente pedido 🎂\n\n${lines.join("\n")}${total}`
    );
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-96 z-50 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="font-bold text-gray-800 text-lg flex items-center gap-2">
            <ShoppingBag size={20} className="text-pink-400" />
            Mi carrito
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <span className="text-6xl mb-4">🛒</span>
              <p className="text-gray-400 font-medium">Tu carrito está vacío</p>
              <p className="text-gray-300 text-sm mt-1">¡Agregá algún producto!</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 items-start bg-gray-50 rounded-2xl p-3"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-sm leading-snug truncate">
                    {item.name}
                  </p>
                  <p className="text-pink-500 font-bold text-sm mt-0.5">
                    ${(item.price * item.qty).toLocaleString("es-AR")}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onDecrement(item.id)}
                      className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-pink-300 transition-colors"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="text-sm font-semibold w-5 text-center">{item.qty}</span>
                    <button
                      onClick={() => onIncrement(item.id)}
                      className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-pink-300 transition-colors"
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => onRemove(item.id)}
                  className="p-1.5 rounded-full hover:bg-red-50 text-gray-300 hover:text-red-400 transition-colors shrink-0"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="px-6 py-5 border-t border-gray-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm">Subtotal</span>
              <span className="font-bold text-gray-800 text-lg">
                ${cartSubtotal.toLocaleString("es-AR")}
              </span>
            </div>
            <p className="text-xs text-gray-400 text-center">
              El precio final se coordina por WhatsApp 🎂
            </p>
            <p className="text-xs text-gray-400 text-center">
              Recorda que todos los pedidos se hacen con seña.
            </p>
            <a
              href={`https://wa.me/${CONFIG.whatsappNumber}?text=${buildWhatsAppMessage()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-green-400 hover:bg-green-500 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-green-100 transition-all hover:scale-[1.02]"
            >
              <MessageCircle size={18} />
              Pedir por WhatsApp
            </a>
            <button
              onClick={onClear}
              className="w-full text-xs text-gray-400 hover:text-red-400 transition-colors py-1"
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
