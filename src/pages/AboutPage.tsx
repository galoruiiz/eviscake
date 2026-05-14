import { Link } from "react-router-dom";
import { CONFIG } from "../data/config";

const VALUES = [
  { icon: "🌿", title: "Natural", desc: "Solo ingredientes frescos y de primera calidad, sin conservantes." },
  { icon: "🎨", title: "Artístico", desc: "Cada diseño es único, creado especialmente para cada cliente." },
  { icon: "💛", title: "Familiar", desc: "Un emprendimiento familiar con recetas guardadas con cariño." },
  { icon: "✨", title: "Especial", desc: "Para cada momento importante de tu vida." },
];

const STEPS = [
  { step: "01", title: "Elegís tu producto", desc: "Navegá el catálogo o escribinos para algo personalizado." },
  { step: "02", title: "Coordinamos por WhatsApp", desc: "Te confirmamos disponibilidad, diseño y fecha de entrega." },
  { step: "03", title: "Lo hacemos con amor", desc: "Preparamos tu pedido con ingredientes frescos del día." },
  { step: "04", title: "¡A disfrutar!", desc: "Lo entregamos o lo retirás listo para endulzar tu momento." },
];

export default function AboutPage() {
  const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero about */}
      <div
        className="relative py-24 px-6 text-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #fdf6f0 0%, #fce8e8 50%, #e8f5f5 100%)" }}
      >
        <div className="max-w-3xl mx-auto relative z-10">
          <span className="inline-block bg-white text-pink-500 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6 shadow-sm">
            Nuestra historia
          </span>
          <h1
            className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          
            >
             Nuestra Historia ⏳​
            </h1>
            >
            {CONFIG.aboutTitle}
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed">{CONFIG.aboutText}</p>
        </div>
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-20"
          style={{ background: "radial-gradient(circle, #f9a8d4, transparent)" }} />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full translate-x-1/2 translate-y-1/2 opacity-20"
          style={{ background: "radial-gradient(circle, #99f6e4, transparent)" }} />
      </div>

      {/* Image + text */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-3xl overflow-hidden shadow-lg aspect-[3/4]">
              <img
                src="https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=500&q=80"
                alt="Torta floral"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid gap-4">
              <div className="rounded-3xl overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1519869325930-281384150729?w=400&q=80"
                  alt="Cupcakes"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&q=80"
                  alt="Cheesecake"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
              ¿Por qué elegirnos?
            </h2>
            <div className="space-y-5">
              {VALUES.map(({ icon, title, desc }) => (
                <div key={title} className="flex gap-4 items-start">
                  <span className="text-2xl shrink-0 mt-0.5">{icon}</span>
                  <div>
                    <h3 className="font-bold text-gray-800">{title}</h3>
                    <p className="text-gray-400 text-sm mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6" style={{ background: "linear-gradient(180deg, #fdf6f0 0%, #fff 100%)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>
              ¿Cómo pedimos? 🎂
            </h2>
            <p className="text-gray-400 mt-3">Simple, rápido y todo por WhatsApp.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map(({ step, title, desc }) => (
              <div key={step} className="bg-white rounded-3xl p-6 shadow-md text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-pink-100 text-pink-500 font-bold text-lg mb-4">
                  {step}
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-white border-t border-gray-100">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            ¿Lista para pedir? 🍰
          </h2>
          <p className="text-gray-400 mb-8">{CONFIG.aboutExtra}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-400 hover:bg-green-500 text-white font-bold px-8 py-3.5 rounded-full shadow-lg transition-all hover:scale-105"
            >
              💬 Escribinos por WhatsApp
            </a>
            <Link
              to="/productos"
              className="inline-flex items-center gap-2 bg-pink-400 hover:bg-pink-500 text-white font-bold px-8 py-3.5 rounded-full shadow-lg transition-all hover:scale-105"
            >
              🛍️ Ver productos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
