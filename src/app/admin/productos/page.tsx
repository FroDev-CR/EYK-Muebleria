"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";

const CATEGORY_LABELS: Record<string, string> = {
  salas: "Salas",
  esquineros: "Esquineros",
  "sofa-camas": "Sofá Camas",
  butacas: "Butacas",
  "sofas-tantricos": "Tántricos",
  comedores: "Comedores",
  camas: "Camas",
  madera: "Madera",
  camillas: "Camillas",
};

export default function ProductosAdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("");
  const [filterBS, setFilterBS] = useState<"" | "yes" | "no">("");

  useEffect(() => {
    fetch("/api/admin/products")
      .then((r) => r.json())
      .then((data) => { setProducts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  async function toggleVisible(id: string, current: boolean) {
    await fetch("/api/admin/products", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, visible: !current }),
    });
    setProducts((ps) =>
      ps.map((p) => (p.id === id ? { ...p, visible: !current } : p))
    );
  }

  async function toggleBestSeller(id: string, current: boolean) {
    await fetch("/api/admin/products", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, isBestSeller: !current }),
    });
    setProducts((ps) =>
      ps.map((p) => (p.id === id ? { ...p, isBestSeller: !current } : p))
    );
  }

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat ? p.category === filterCat : true;
    const matchBS =
      filterBS === "yes" ? p.isBestSeller
      : filterBS === "no" ? !p.isBestSeller
      : true;
    return matchSearch && matchCat && matchBS;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#111]">Productos</h1>
          <p className="text-sm text-[#666] mt-0.5">{filtered.length} de {products.length} productos</p>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="bg-[#FB531F] hover:bg-[#d43e0a] text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
        >
          + Agregar producto
        </Link>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-3 mb-5">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-[#e5e5e5] rounded-lg px-3 py-2 text-sm w-56 focus:outline-none focus:border-[#FB531F]"
        />
        <select
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
          className="border border-[#e5e5e5] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#FB531F]"
        >
          <option value="">Todas las categorías</option>
          {Object.entries(CATEGORY_LABELS).map(([id, label]) => (
            <option key={id} value={id}>{label}</option>
          ))}
        </select>
        <select
          value={filterBS}
          onChange={(e) => setFilterBS(e.target.value as "" | "yes" | "no")}
          className="border border-[#e5e5e5] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#FB531F]"
        >
          <option value="">Todos</option>
          <option value="yes">Best Sellers</option>
          <option value="no">No Best Seller</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-16 text-[#999]">Cargando productos...</div>
      ) : (
        <div className="bg-white rounded-xl border border-[#e5e5e5] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e5e5e5] bg-[#f8f8f8]">
                <th className="text-left px-4 py-3 text-[#666] font-semibold w-16">Img</th>
                <th className="text-left px-4 py-3 text-[#666] font-semibold">Nombre</th>
                <th className="text-left px-4 py-3 text-[#666] font-semibold">Categoría</th>
                <th className="text-left px-4 py-3 text-[#666] font-semibold">Precio Oferta</th>
                <th className="text-left px-4 py-3 text-[#666] font-semibold">Precio Regular</th>
                <th className="text-left px-4 py-3 text-[#666] font-semibold">Medidas</th>
                <th className="text-center px-4 py-3 text-[#666] font-semibold">Best Seller</th>
                <th className="text-center px-4 py-3 text-[#666] font-semibold">Visible</th>
                <th className="text-center px-4 py-3 text-[#666] font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className={`border-b border-[#f1f1f1] hover:bg-[#fafafa] transition ${!p.visible ? "opacity-50" : ""}`}>
                  <td className="px-4 py-3">
                    <div className="w-12 h-12 rounded overflow-hidden bg-[#f1f1f1] relative">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-[#111] leading-snug">{p.name}</p>
                    <p className="text-[10px] text-[#999] mt-0.5">{p.id}</p>
                  </td>
                  <td className="px-4 py-3 text-[#555]">
                    {CATEGORY_LABELS[p.category] ?? p.category}
                  </td>
                  <td className="px-4 py-3 font-semibold text-[#FB531F]">
                    {p.price ? formatPrice(p.price) : <span className="text-[#ccc]">—</span>}
                  </td>
                  <td className="px-4 py-3 text-[#999] line-through">
                    {p.regularPrice ? formatPrice(p.regularPrice) : <span className="no-underline text-[#ccc]">—</span>}
                  </td>
                  <td className="px-4 py-3 text-[#555] text-xs">
                    {p.dimensions || <span className="text-[#ccc]">—</span>}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => toggleBestSeller(p.id, p.isBestSeller)}
                      className={`w-8 h-8 rounded-full text-sm font-bold transition ${p.isBestSeller ? "bg-[#FB531F] text-white" : "bg-[#f1f1f1] text-[#999] hover:bg-[#e5e5e5]"}`}
                      title="Toggle Best Seller"
                    >
                      ★
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => toggleVisible(p.id, p.visible)}
                      className={`px-2 py-1 rounded text-xs font-semibold transition ${p.visible ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-[#f1f1f1] text-[#999] hover:bg-[#e5e5e5]"}`}
                    >
                      {p.visible ? "Sí" : "No"}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Link
                      href={`/admin/productos/${p.id}`}
                      className="inline-block text-xs font-semibold text-[#FB531F] hover:underline"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-[#999]">
                    No se encontraron productos
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
