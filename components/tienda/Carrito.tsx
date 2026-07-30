"use client";

import Link from "next/link";
import { cliente } from "@/lib/config/cliente";
import { getImagenProducto } from "@/lib/data/productos";
import { enlaceWhatsApp, formatearGs, formatearPrecio } from "@/lib/utils/formato";
import { useCarrito, type LineaCarrito } from "@/components/tienda/useCarrito";

function textoPedido(lineas: LineaCarrito[], subtotal: number, sinPrecio: number): string {
  const partes: string[] = [];
  partes.push(`Hola César, vengo de la tienda web de ${cliente.marca}. Quiero pedir:`);
  partes.push("");

  lineas.forEach((linea, indice) => {
    const precio = linea.subtotal === null ? "a confirmar" : formatearGs(linea.subtotal);
    partes.push(`${indice + 1}. ${linea.producto.nombre} x${linea.cantidad} — ${precio}`);
  });

  partes.push("");
  if (subtotal > 0) partes.push(`Subtotal estimado: ${formatearGs(subtotal)}`);
  if (sinPrecio > 0) {
    partes.push(`(${sinPrecio} ítem/s quedan a confirmar precio)`);
  }
  partes.push("");
  partes.push("¿Me confirmás disponibilidad, precio final y si incluye instalación?");

  return partes.join("\n");
}

export default function Carrito() {
  const { lineas, subtotal, itemsSinPrecio, listo, actualizarCantidad, quitar, vaciar } =
    useCarrito();

  if (!listo) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-md">
        <p className="text-slate-500">Cargando tu pedido...</p>
      </div>
    );
  }

  if (lineas.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-md">
        <p className="text-lg font-semibold text-slate-900">Tu pedido está vacío</p>
        <p className="mt-2 text-slate-600">
          Agregá cámaras, grabadores o accesorios desde la tienda y armá tu pedido en un minuto.
        </p>
        <Link
          href="/tienda"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
        >
          Ir a la tienda
        </Link>
      </div>
    );
  }

  const ivaIncluido = Math.round(subtotal / 11);

  return (
    <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
      <section className="space-y-4">
        {lineas.map((linea) => (
          <article
            key={linea.slug}
            className="flex flex-col gap-4 rounded-3xl bg-white p-5 shadow-md sm:flex-row sm:items-center"
          >
            <img
              src={getImagenProducto(linea.producto)}
              alt={linea.producto.nombre}
              className="h-24 w-full rounded-2xl object-cover sm:w-24"
              loading="lazy"
            />

            <div className="flex-1">
              <Link
                href={`/tienda/${linea.slug}`}
                className="font-semibold text-slate-900 hover:text-slate-700"
              >
                {linea.producto.nombre}
              </Link>
              <p className="mt-1 text-sm text-slate-500">
                {formatearPrecio(linea.producto.precio)} por unidad
              </p>

              <div className="mt-3 inline-flex items-center rounded-full border border-slate-300">
                <button
                  type="button"
                  onClick={() => actualizarCantidad(linea.slug, linea.cantidad - 1)}
                  className="h-10 w-10 rounded-l-full text-lg font-semibold text-slate-700 transition hover:bg-slate-100"
                  aria-label={`Quitar una unidad de ${linea.producto.nombre}`}
                >
                  −
                </button>
                <span className="w-10 text-center font-semibold text-slate-900">
                  {linea.cantidad}
                </span>
                <button
                  type="button"
                  onClick={() => actualizarCantidad(linea.slug, linea.cantidad + 1)}
                  className="h-10 w-10 rounded-r-full text-lg font-semibold text-slate-700 transition hover:bg-slate-100"
                  aria-label={`Agregar una unidad de ${linea.producto.nombre}`}
                >
                  +
                </button>
              </div>
            </div>

            <div className="text-right">
              <p className="font-bold text-slate-900">
                {linea.subtotal === null ? "A confirmar" : formatearGs(linea.subtotal)}
              </p>
              <button
                type="button"
                onClick={() => quitar(linea.slug)}
                className="mt-2 text-sm text-slate-500 underline transition hover:text-slate-800"
              >
                Quitar
              </button>
            </div>
          </article>
        ))}

        <button
          type="button"
          onClick={vaciar}
          className="text-sm text-slate-500 underline transition hover:text-slate-800"
        >
          Vaciar pedido
        </button>
      </section>

      <aside className="h-fit rounded-3xl bg-white p-6 shadow-lg lg:sticky lg:top-6">
        <h2 className="text-xl font-semibold text-slate-900">Resumen</h2>

        <div className="mt-4 space-y-2 text-slate-700">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-semibold">{formatearGs(subtotal)}</span>
          </div>
          {subtotal > 0 && (
            <div className="flex justify-between text-sm text-slate-500">
              <span>IVA {cliente.ivaPorcentaje}% incluido</span>
              <span>{formatearGs(ivaIncluido)}</span>
            </div>
          )}
          {itemsSinPrecio > 0 && (
            <p className="rounded-2xl bg-amber-50 p-3 text-sm text-amber-900">
              {itemsSinPrecio} producto{itemsSinPrecio === 1 ? "" : "s"} sin precio publicado. Te
              confirmamos el valor por WhatsApp antes de cerrar el pedido.
            </p>
          )}
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <a
            href={enlaceWhatsApp(textoPedido(lineas, subtotal, itemsSinPrecio))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#25D366] px-6 py-4 font-semibold text-white transition hover:brightness-95"
          >
            Enviar pedido por WhatsApp
          </a>
          <Link
            href="/presupuesto?desde=carrito"
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            Generar presupuesto en PDF
          </Link>
          <Link
            href="/tienda"
            className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Seguir comprando
          </Link>
        </div>

        <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
          <p className="font-semibold text-slate-800">Formas de pago</p>
          <p className="mt-1">Efectivo, transferencia bancaria o pago móvil.</p>
          <Link href="/pagos" className="mt-2 inline-block underline hover:text-slate-900">
            Ver datos de transferencia
          </Link>
        </div>
      </aside>
    </div>
  );
}
