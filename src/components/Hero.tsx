import { Link } from "react-router-dom";
import { CONFIG } from "../data/config";

export default function Hero() {
  const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;

  return (
    <section className="relative overflow-hidden min-h-[88vh] flex items-center">
      {/* Background gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(135deg, #fdf6f0 0%, #fce8e8 40%, #e8f5f5 100%)",
        }}
      />

      {/* Decorative blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-30 -z-10"
        style={{ background: "radial-gradient(circle, #f9a8d4, transparent 70%)" }} />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full opacity-20 -z-10"
        style={{ background: "radial-gradient(circle, #99f6e4, transparent 70%)" }} />

      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center w-full">
        {/* Text */}
        <div className="text-center md:text-left">
          {/* Tag */}
          <span className="inline-block bg-pink-100 text-pink-600 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
            Pastelería Artesanal ✨
          </span>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {CONFIG.heroTitle}
          </h1>

          <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-md mx-auto md:mx-0">
            {CONFIG.heroSubtitle}
          </p>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <Link
              to="/productos"
              className="inline-flex items-center gap-2 bg-pink-400 hover:bg-pink-500 text-white font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-pink-200 transition-all hover:scale-105 hover:shadow-pink-300"
            >
              🍰 {CONFIG.heroCta}
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white hover:bg-green-50 text-green-600 border border-green-200 font-semibold px-8 py-3.5 rounded-full shadow transition-all hover:scale-105"
            >
              💬 {CONFIG.heroCtaSecondary}
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-12 justify-center md:justify-start">
            {[
              { value: "100%", label: "Artesanal" },
              { value: "❤️", label: "Con amor" },
              { value: "🎂", label: "A medida" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-bold text-pink-500">{value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Image collage */}
        <div className="relative hidden md:flex justify-center items-center">
          <div className="relative w-80 h-80">
            {/* Main image */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl rotate-3">
              <img
                src="https://i.imgur.com/yHi4Sbo.jpeg"
                alt="Torta artesanal"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating card 1 */}
            <div className="absolute -bottom-10 -left-12 w-36 h-36 rounded-2xl overflow-hidden shadow-xl -rotate-6 border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1519869325930-281384150729?w=300&q=80"
                alt="Cupcakes"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating card 2 */}
            <div className="absolute -top-8 -right-10 w-32 h-32 rounded-2xl overflow-hidden shadow-xl rotate-6 border-4 border-white">
              <img
                src="https://i.imgur.com/dzB10ya.jpeg"
                alt="Torta floral"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Badge */}
            <div className="absolute -bottom-4 right-0 bg-white rounded-2xl shadow-lg px-4 py-2 text-center">
              <p className="text-xs text-gray-400">Hecho en casa</p>
              <p className="text-sm font-bold text-pink-500">con ❤️</p>
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 60L48 50C96 40 192 20 288 16.7C384 13.3 480 26.7 576 33.3C672 40 768 40 864 33.3C960 26.7 1056 13.3 1152 10C1248 6.7 1344 13.3 1392 16.7L1440 20V60H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
