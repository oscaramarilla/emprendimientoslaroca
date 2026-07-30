"use client";

import { useState } from "react";
import Link from "next/link";
import { cliente } from "@/lib/config/cliente";
import BotonCarrito from "@/components/tienda/BotonCarrito";

function rutaDe(item: string): string {
  return item === "Inicio" ? "/" : `/${item.toLowerCase()}`;
}

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="no-print bg-primary text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          {cliente.marca}
        </Link>

        <nav className="hidden md:flex">
          <ul className="flex items-center gap-6">
            {cliente.navegacion.map((item) =>
              item === "Tienda" ? (
                <li key={item}>
                  <Link
                    href="/tienda"
                    className="rounded-full bg-accent px-4 py-2 text-sm font-bold text-slate-900 transition hover:brightness-95"
                  >
                    TIENDA
                  </Link>
                </li>
              ) : (
                <li key={item}>
                  <Link
                    href={rutaDe(item)}
                    className="text-sm font-medium text-slate-100 hover:text-accent"
                  >
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <BotonCarrito />

          <button
            type="button"
            className="inline-flex h-11 w-11 flex-col items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white transition hover:bg-white/15 md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
          >
            <span className="block h-0.5 w-6 bg-white"></span>
            <span className="mt-1.5 block h-0.5 w-6 bg-white"></span>
            <span className="mt-1.5 block h-0.5 w-6 bg-white"></span>
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 p-6 backdrop-blur-sm md:hidden">
          <div className="mb-10 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-white" onClick={() => setOpen(false)}>
              {cliente.marca}
            </Link>
            <div className="flex items-center gap-2">
              <BotonCarrito onNavegar={() => setOpen(false)} />
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white transition hover:bg-white/15"
                onClick={() => setOpen(false)}
                aria-label="Cerrar menú"
              >
                <span className="inline-block h-0.5 w-6 rotate-45 bg-white"></span>
                <span className="-ml-6 inline-block h-0.5 w-6 -rotate-45 bg-white"></span>
              </button>
            </div>
          </div>

          <nav>
            <ul className="space-y-6 text-xl text-slate-100">
              {cliente.navegacion.map((item) => (
                <li key={item}>
                  <Link
                    href={rutaDe(item)}
                    className={
                      item === "Tienda"
                        ? "inline-block rounded-full bg-accent px-5 py-2 font-bold text-slate-900"
                        : "block font-semibold"
                    }
                    onClick={() => setOpen(false)}
                  >
                    {item === "Tienda" ? "TIENDA" : item}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/presupuesto"
                  className="block font-semibold text-accent"
                  onClick={() => setOpen(false)}
                >
                  Armar presupuesto
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
