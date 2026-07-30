"use client";

import { useState } from "react";
import Link from "next/link";
import type { Producto } from "@/lib/data/productos";
import { enlaceWhatsApp } from "@/lib/utils/formato";
import { useCarrito } from "@/components/tienda/useCarrito";

export default function AgregarAlPedido({ producto }: { producto: Producto }) {
  const { agregar } = useCarrito();
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);

  const handleAgregar = () => {
    agregar(producto.slug, cantidad);
    setAgregado(true);
    window.setTimeout(() => setAgregado(false), 2000);
  };

  const mensaje = `Hola César, vengo de la tienda web. Me interesa: ${producto.nombre} (cantidad: ${cantidad}).`;

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center gap-4">
        <div className="inline-flex items-center rounded-full border border-slate-300">
          <button
            type="button"
            onClick={() => setCantidad((valor) => Math.max(1, valor - 1))}
            className="h-12 w-12 rounded-l-full text-xl font-semibold text-slate-700 transition hover:bg-slate-100"
            aria-label="Quitar una unidad"
          >
            −
          </button>
          <span className="w-12 text-center font-semibold text-slate-900" aria-live="polite">
            {cantidad}
          </span>
          <button
            type="button"
            onClick={() => setCantidad((valor) => Math.min(99, valor + 1))}
            className="h-12 w-12 rounded-r-full text-xl font-semibold text-slate-700 transition hover:bg-slate-100"
            aria-label="Agregar una unidad"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={handleAgregar}
          className="inline-flex flex-1 items-center justify-center rounded-full bg-slate-900 px-6 py-4 font-semibold text-white transition hover:bg-slate-800 sm:flex-none"
        >
          {agregado ? "Agregado al pedido" : "Agregar al pedido"}
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/tienda/carrito"
          className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Ver mi pedido
        </Link>
        <a
          href={enlaceWhatsApp(mensaje)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white transition hover:brightness-95"
        >
          Consultar por WhatsApp
        </a>
      </div>
    </div>
  );
}
