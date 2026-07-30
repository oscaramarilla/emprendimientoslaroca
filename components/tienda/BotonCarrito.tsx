"use client";

import Link from "next/link";
import { useCarrito } from "@/components/tienda/useCarrito";

export default function BotonCarrito({ onNavegar }: { onNavegar?: () => void }) {
  const { cantidadTotal, listo } = useCarrito();

  return (
    <Link
      href="/tienda/carrito"
      onClick={onNavegar}
      className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white transition hover:bg-white/15"
      aria-label={`Ver carrito${listo && cantidadTotal > 0 ? ` (${cantidadTotal} productos)` : ""}`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.5a2 2 0 0 0 2-1.55L20.5 8H6" />
        <circle cx="10" cy="20" r="1.4" />
        <circle cx="17.5" cy="20" r="1.4" />
      </svg>
      {listo && cantidadTotal > 0 && (
        <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-xs font-bold text-slate-900">
          {cantidadTotal}
        </span>
      )}
    </Link>
  );
}
