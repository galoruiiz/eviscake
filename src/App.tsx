import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartSidebar from "./components/CartSidebar";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import { useCart } from "./hooks/useCart";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const {
    cart,
    cartCount,
    cartSubtotal,
    addToCart,
    increment,
    decrement,
    removeItem,
    clearCart,
  } = useCart();

  const handleAdd = (p: Parameters<typeof addToCart>[0]) => {
    addToCart(p);
    setCartOpen(true);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col font-sans text-gray-800">
        {/* Logo header */}
        <header className="bg-white border-b border-gray-100 flex items-center justify-center py-4 gap-3">
          <img
            src="https://i.imgur.com/4y41GFf.png"
            alt="Evis Cake – Pastelería Artesanal"
            className="h-14 w-auto drop-shadow-sm"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div>
            <p
              className="text-xl font-bold text-gray-800 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Evis Cake
            </p>
            <p className="text-xs text-pink-400 tracking-widest font-medium uppercase">
              Pastelería Artesanal
            </p>
          </div>
        </header>

        {/* Sticky Navbar */}
        <Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />

        {/* Page content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage onAdd={handleAdd} />} />
            <Route path="/productos" element={<ProductsPage onAdd={handleAdd} />} />
            <Route path="/nosotros" element={<AboutPage />} />
            <Route path="/contacto" element={<ContactPage />} />
            {/* Fallback */}
            <Route path="*" element={<HomePage onAdd={handleAdd} />} />
          </Routes>
        </main>

        <Footer />

        {/* Cart sidebar */}
        <CartSidebar
          open={cartOpen}
          onClose={() => setCartOpen(false)}
          cart={cart}
          cartSubtotal={cartSubtotal}
          onIncrement={increment}
          onDecrement={decrement}
          onRemove={removeItem}
          onClear={clearCart}
        />
      </div>
      <Analytics />
    </BrowserRouter>
  );
}
