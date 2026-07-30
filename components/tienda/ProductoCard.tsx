"use client";

import { useState } from "react";
import Link from "next/link";
import { getImagenProducto, type Producto } from "@/lib/data/productos";
import { formatearPrecio } from "@/lib/utils/formato";
import { useCarrito } from "@/components/tienda/useCarrito";

export default function ProductoCard({ producto }: { producto: Producto }) {
  const { agregar } = useCarrito();
  const [agregado, setAgregado] = useState(false);

  const handleAgregar = () => {
    agregar(producto.slug, 1);
    setAgregado(true);
    window.setTimeout(() => setAgregado(false), 1600);
  };

  return (
    <article className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-md transition-shadow hover:shadow-lg">
      <Link href={`/tienda/${producto.slug}`} className="group block">
        <div className="relative h-48 w-full overflow-hidden bg-slate-200">
          <img
            src={getImagenProducto(producto)}
            alt={producto.nombre}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {producto.destacado && (
            <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-900">
              Más pedido
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <Link href={`/tienda/${producto.slug}`}>
          <h3 className="text-lg font-semibold text-slate-900 hover:text-slate-700">
            {producto.nombre}
          </h3>
        </Link>
        {producto.marca && (
          <p className="mt-1 text-sm text-slate-500">{producto.marca}</p>
        )}
        <p className="mt-3 flex-1 text-sm text-slate-600">{producto.resumen}</p>

        <p className="mt-4 text-xl font-bold text-slate-900">
          {formatearPrecio(producto.precio)}
        </p>
        {producto.precio !== null && (
          <p className="text-xs text-slate-500">IVA incluido</p>
        )}

        <div className="mt-5 flex flex-col gap-2">
          <button
            type="button"
            onClick={handleAgregar}
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {agregado ? "Agregado al pedido" : "Agregar al pedido"}
          </button>
          <Link
            href={`/tienda/${producto.slug}`}
            className="inline-flex items-center justify-center rounded-full border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Ver detalle
          </Link>
        </div>
      </div>
    </article>
  );
}
