import { MessageCircle, Clock, MapPin, Camera } from "lucide-react";
import { CONFIG } from "../data/config";

// Inline IG icon
const IgIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

const FAQS = [
  {
    q: "¿Cuánto tiempo antes debo hacer el pedido?",
    a: "Recomendamos pedirlo con al menos 3-5 días de anticipación. Para tortas personalizadas o grandes, con 1 semana.",
  },
  {
    q: "¿Hacen entregas a domicilio?",
    a: "Sí, coordinamos la entrega por WhatsApp. El costo depende de la zona.",
  },
  {
    q: "¿Puedo pedir algo personalizado?",
    a: "¡Por supuesto! Escribinos con tu idea y lo hacemos realidad. Diseños, sabores y tamaños a medida.",
  },
  {
    q: "¿Tienen opciones sin gluten?",
    a: "Sí, consultanos por WhatsApp y te damos las opciones disponibles según la temporada.",
  },
  {
    q: "¿Cómo se realiza el pago?",
    a: "Aceptamos efectivo y transferencia. Te damos los datos al confirmar el pedido.",
  },
];

export default function ContactPage() {
  const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #fdf6f0 0%, #fff 100%)" }}>
      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-14 px-6 text-center">
        <span className="inline-block bg-pink-100 text-pink-600 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
          Contacto
        </span>
        <h1
          className="text-4xl sm:text-5xl font-bold text-gray-800 mb-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Hablemos 💬
        </h1>
        <p className="text-gray-400 max-w-md mx-auto">
          Toda la atención es personalizada. Escribinos y te respondemos lo antes posible.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
        {/* Contact cards */}
        <div className="space-y-5">
          <h2
            className="text-2xl font-bold text-gray-800 mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Encontranos aquí
          </h2>

          {/* WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-5 bg-white rounded-3xl p-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <MessageCircle size={26} className="text-green-500" />
            </div>
            <div>
              <p className="font-bold text-gray-800">WhatsApp</p>
              <p className="text-gray-400 text-sm">+{CONFIG.whatsappNumber}</p>
              <p className="text-green-500 text-xs font-medium mt-0.5">Tap para escribirnos →</p>
            </div>
          </a>

          {/* Instagram */}
          {CONFIG.instagramUrl && (
            <a
              href={CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 bg-white rounded-3xl p-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-pink-100 flex items-center justify-center group-hover:bg-pink-200 transition-colors">
                <IgIcon size={26} />
              </div>
              <div>
                <p className="font-bold text-gray-800">Instagram</p>
                <p className="text-gray-400 text-sm">{CONFIG.instagramUrl.replace("https://instagram.com/", "@")}</p>
                <p className="text-pink-500 text-xs font-medium mt-0.5">Ver fotos y novedades →</p>
              </div>
            </a>
          )}

          {/* Horario */}
          <div className="flex items-center gap-5 bg-white rounded-3xl p-6 shadow-md">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center">
              <Clock size={26} className="text-amber-500" />
            </div>
            <div>
              <p className="font-bold text-gray-800">Horario de atención</p>
              <p className="text-gray-400 text-sm">Lunes a Sábado · 9:00 – 20:00</p>
              <p className="text-gray-300 text-xs mt-0.5">Domingos con previo aviso</p>
            </div>
          </div>

          {/* Zona */}
          <div className="flex items-center gap-5 bg-white rounded-3xl p-6 shadow-md">
            <div className="w-14 h-14 rounded-2xl bg-teal-100 flex items-center justify-center">
              <MapPin size={26} className="text-teal-500" />
            </div>
            <div>
              <p className="font-bold text-gray-800">Zona de entrega</p>
              <p className="text-gray-400 text-sm">Consultanos por tu zona</p>
              <p className="text-gray-300 text-xs mt-0.5">También retiro por el local</p>
            </div>
          </div>

          {/* Instagram gallery teaser */}
          {CONFIG.instagramUrl && (
            <a
              href={CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl p-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 group border border-pink-100"
            >
              <div className="w-14 h-14 rounded-2xl bg-white shadow flex items-center justify-center">
                <Camera size={26} className="text-pink-400" />
              </div>
              <div>
                <p className="font-bold text-gray-800">Seguinos en Instagram</p>
                <p className="text-gray-400 text-sm">Mirá nuestras creaciones más recientes</p>
                <p className="text-pink-500 text-xs font-medium mt-0.5 group-hover:underline">Ver perfil →</p>
              </div>
            </a>
          )}
        </div>

        {/* FAQ */}
        <div>
          <h2
            className="text-2xl font-bold text-gray-800 mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Preguntas frecuentes
          </h2>
          <div className="space-y-4">
            {FAQS.map(({ q, a }) => (
              <details
                key={q}
                className="group bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer font-semibold text-gray-800 text-sm list-none">
                  {q}
                  <span className="text-pink-400 text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-6 pb-5">
                  <p className="text-gray-400 text-sm leading-relaxed">{a}</p>
                </div>
              </details>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <div className="mt-8 bg-green-50 rounded-3xl p-6 text-center border border-green-100">
            <p className="font-bold text-gray-800 mb-1">¿No encontraste tu respuesta?</p>
            <p className="text-gray-400 text-sm mb-4">Escribinos directo por WhatsApp 💬</p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-400 hover:bg-green-500 text-white font-bold px-6 py-3 rounded-full shadow-md transition-all hover:scale-105"
            >
              <MessageCircle size={16} /> Consultar ahora
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
