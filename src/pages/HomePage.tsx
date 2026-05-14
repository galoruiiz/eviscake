import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import { PRODUCTS } from "../data/products";
import ProductCard from "../components/ProductCard";
import { CONFIG } from "../data/config";
import type { Product } from "../data/products";

interface HomePageProps {
  onAdd: (p: Product) => void;
}

const FEATURES = [
  { icon: "🌾", title: "Ingredientes naturales", desc: "Sin conservantes ni aditivos artificiales." },
  { icon: "🎨", title: "Diseño personalizado", desc: "Cada pedido es único, creado para vos." },
  { icon: "🚚", title: "Entrega a domicilio", desc: "Coordinamos la entrega por WhatsApp." },
  { icon: "💝", title: "Hecho con amor", desc: "Pasión en cada capa y decoración." },
];

export default function HomePage({ onAdd }: HomePageProps) {
  const featured = PRODUCTS.filter((p) => p.tag === "Popular" || p.tag === "Nuevo").slice(0, 3);

  return (
    <>
      <Hero />

      {/* Features strip */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(({ icon, title, desc }) => (
              <div key={title} className="text-center p-6 rounded-3xl hover:bg-pink-50 transition-colors">
                <span className="text-4xl">{icon}</span>
                <h3 className="font-bold text-gray-800 mt-3 mb-1 text-sm">{title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="py-20 px-6" style={{ background: "linear-gradient(180deg, #fff 0%, #fdf6f0 100%)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-pink-100 text-pink-600 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
              Lo más pedido
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold text-gray-800"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Nuestros favoritos 🍰
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={onAdd} />
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/productos"
              className="inline-flex items-center gap-2 bg-pink-400 hover:bg-pink-500 text-white font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-pink-100 transition-all hover:scale-105"
            >
              Ver catálogo completo →
            </Link>
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-xl aspect-square max-w-md mx-auto">
              <img
                src="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=700&q=80"
                alt="Nuestra pastelería"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -right-5 bg-pink-400 text-white rounded-2xl px-5 py-3 shadow-lg hidden md:block">
              <p className="font-bold text-lg">+500</p>
              <p className="text-xs opacity-90">tortas hechas 🎂</p>
            </div>
          </div>

          <div>
            <span className="inline-block bg-teal-100 text-teal-600 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
              Sobre nosotros
            </span>
            <h2
              className="text-3xl font-bold text-gray-800 mb-5 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Nuestra historia
            </h2>
            <p className="text-gray-500 leading-relaxed mb-4">{CONFIG.aboutText}</p>
            <p className="text-pink-500 font-medium italic">{CONFIG.aboutExtra}</p>
            <Link
              to="/nosotros"
              className="inline-block mt-6 text-pink-500 font-semibold hover:text-pink-600 transition-colors border-b-2 border-pink-200 hover:border-pink-400 pb-0.5"
            >
              Conocé nuestra historia →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6" style={{ background: "linear-gradient(135deg, #f9a8d4 0%, #c084fc 100%)" }}>
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            ¿Tenés un evento especial? 🎉
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Diseñamos la torta perfecta para tu cumple, casamiento o baby shower. ¡Escribinos!
          </p>
          <a
            href={`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent("Hola Evi! Quiero consultar por un pedido especial 🎂")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-pink-500 font-bold px-8 py-4 rounded-full shadow-xl transition-all hover:scale-105 hover:shadow-2xl text-lg"
          >
            💬 Hacer un pedido especial
          </a>
        </div>
      </section>
    </>
  );
}
