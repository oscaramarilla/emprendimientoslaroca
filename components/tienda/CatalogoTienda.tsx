"use client";

import { useMemo, useState } from "react";
import { categorias, productos } from "@/lib/data/productos";
import ProductoCard from "@/components/tienda/ProductoCard";

const TODAS = "todas";

/** Marcas diacríticas: permite que "camara" encuentre "cámara". */
const ACENTOS = new RegExp("[\\u0300-\\u036f]", "g");

function normalizar(texto: string): string {
  return texto.toLowerCase().normalize("NFD").replace(ACENTOS, "");
}

export default function CatalogoTienda() {
  const [categoriaActiva, setCategoriaActiva] = useState<string>(TODAS);
  const [busqueda, setBusqueda] = useState("");

  const resultados = useMemo(() => {
    const termino = normalizar(busqueda.trim());
    return productos.filter((producto) => {
      const coincideCategoria =
        categoriaActiva === TODAS || producto.categoria === categoriaActiva;
      if (!coincideCategoria) return false;
      if (!termino) return true;
      const texto = normalizar(
        `${producto.nombre} ${producto.resumen} ${producto.marca ?? ""} ${producto.descripcion ?? ""}`
      );
      return texto.includes(termino);
    });
  }, [categoriaActiva, busqueda]);

  return (
    <section>
      <div className="mb-8 flex flex-col gap-4">
        <label className="relative block">
          <span className="sr-only">Buscar producto</span>
          <input
            type="search"
            value={busqueda}
            onChange={(evento) => setBusqueda(evento.target.value)}
            placeholder="Buscar cámara, grabador, disco, accesorio..."
            className="w-full rounded-full border border-slate-300 bg-white px-6 py-4 text-slate-900 shadow-sm outline-none transition focus:border-slate-500"
          />
        </label>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategoriaActiva(TODAS)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              categoriaActiva === TODAS
                ? "bg-slate-900 text-white"
                : "border border-slate-300 text-slate-700 hover:bg-slate-100"
            }`}
          >
            Todos
          </button>
          {categorias.map((categoria) => (
            <button
              key={categoria.slug}
              type="button"
              onClick={() => setCategoriaActiva(categoria.slug)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                categoriaActiva === categoria.slug
                  ? "bg-slate-900 text-white"
                  : "border border-slate-300 text-slate-700 hover:bg-slate-100"
              }`}
            >
              {categoria.nombre}
            </button>
          ))}
        </div>

        {categoriaActiva !== TODAS && (
          <p className="text-sm text-slate-600">
            {categorias.find((c) => c.slug === categoriaActiva)?.descripcion}
          </p>
        )}
      </div>

      {resultados.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="font-semibold text-slate-900">No encontramos ese producto</p>
          <p className="mt-2 text-slate-600">
            Probá con otra palabra o escribinos por WhatsApp: conseguimos equipos a pedido.
          </p>
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm text-slate-500">
            {resultados.length} producto{resultados.length === 1 ? "" : "s"}
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resultados.map((producto) => (
              <ProductoCard key={producto.slug} producto={producto} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
