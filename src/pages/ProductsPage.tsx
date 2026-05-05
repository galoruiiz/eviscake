import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { PRODUCTS, CATEGORIES } from "../data/products";
import ProductCard from "../components/ProductCard";
import type { Product, Category } from "../data/products";

interface ProductsPageProps {
  onAdd: (p: Product) => void;
}

export default function ProductsPage({ onAdd }: ProductsPageProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<"Todas" | Category>("Todas");
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc">("default");

  const filtered = useMemo(() => {
    let result = [...PRODUCTS];

    // Category filter
    if (activeCategory !== "Todas") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);

    return result;
  }, [search, activeCategory, sortBy]);

  const clearFilters = () => {
    setSearch("");
    setActiveCategory("Todas");
    setSortBy("default");
  };

  const hasFilters = search || activeCategory !== "Todas" || sortBy !== "default";

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #fdf6f0 0%, #f2f9f9 100%)" }}>
      {/* Page header */}
      <div className="bg-white border-b border-gray-100 py-14 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-block bg-pink-100 text-pink-600 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            Catálogo
          </span>
          <h1
            className="text-4xl sm:text-5xl font-bold text-gray-800 mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Nuestros Productos 🍰
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Encontrá tu postre favorito. Todo hecho a mano con amor y los mejores ingredientes.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Filters bar */}
        <div className="bg-white rounded-3xl shadow-sm p-4 sm:p-5 mb-8 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-200 transition"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 shrink-0">
            <SlidersHorizontal size={15} className="text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="text-sm bg-gray-50 rounded-xl px-3 py-2.5 text-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-200 transition cursor-pointer"
            >
              <option value="default">Ordenar</option>
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
            </select>
          </div>

          {/* Clear */}
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-pink-400 hover:text-pink-600 font-medium shrink-0 flex items-center gap-1"
            >
              <X size={14} /> Limpiar
            </button>
          )}
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-pink-400 text-white shadow-md shadow-pink-100"
                  : "bg-white text-gray-500 hover:bg-pink-50 hover:text-pink-500 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-400 mb-6">
          {filtered.length === 0
            ? "No se encontraron productos"
            : `${filtered.length} producto${filtered.length !== 1 ? "s" : ""} encontrado${filtered.length !== 1 ? "s" : ""}`}
          {activeCategory !== "Todas" && ` en ${activeCategory}`}
          {search && ` para "${search}"`}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={onAdd} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <span className="text-6xl">🔍</span>
            <p className="text-gray-400 mt-4 font-medium">No encontramos lo que buscás</p>
            <button
              onClick={clearFilters}
              className="mt-4 text-pink-400 hover:text-pink-600 text-sm font-semibold"
            >
              Ver todos los productos
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
