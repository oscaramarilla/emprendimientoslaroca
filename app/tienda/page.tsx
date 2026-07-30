import type { Metadata } from "next";
import Link from "next/link";
import { cliente } from "@/lib/config/cliente";
import { enlaceWhatsApp } from "@/lib/utils/formato";
import CatalogoTienda from "@/components/tienda/CatalogoTienda";

export const metadata: Metadata = {
  title: `${cliente.tienda.titulo} | ${cliente.marca}`,
  description: cliente.tienda.subtitulo,
  alternates: { canonical: `${cliente.seo.baseUrl}/tienda` },
};

export default function Tienda() {
  return (
    <div className="container mx-auto p-4">
      <header className="mb-10 text-center">
        <p className="mb-2 font-semibold text-slate-800">Venta directa de equipos</p>
        <h1 className="text-4xl font-bold text-slate-900">{cliente.tienda.titulo}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-slate-600">{cliente.tienda.subtitulo}</p>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-500">{cliente.tienda.entrega}</p>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/tienda/carrito"
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            Ver mi pedido
          </Link>
          <Link
            href="/presupuesto"
            className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Armar un presupuesto
          </Link>
        </div>
      </header>

      {cliente.tienda.catalogoEnCarga && (
        <div className="mb-8 rounded-3xl border border-amber-200 bg-amber-50 p-6 text-center">
          <p className="font-semibold text-amber-900">
            Estamos cargando la lista de precios actualizada
          </p>
          <p className="mt-2 text-sm text-amber-800">
            Agregá los productos que te interesan y te pasamos el precio del día por WhatsApp, o
            escribinos directamente y te cotizamos al momento.
          </p>
          <a
            href={enlaceWhatsApp(
              "Hola César, vengo de la tienda web y quiero consultar precios de cámaras y equipos."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-95"
          >
            Consultar precios por WhatsApp
          </a>
        </div>
      )}

      <CatalogoTienda />

      <section className="mt-16 rounded-3xl bg-gray-100 p-8 shadow-sm">
        <h2 className="mb-4 text-2xl font-semibold text-slate-900">
          Compramos, instalamos y configuramos
        </h2>
        <p className="mb-6 text-slate-700">
          No vendemos solamente el equipo: si querés, el mismo equipo de La Roca hace la
          instalación, el cableado y te deja las cámaras funcionando en el celular.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="font-semibold text-slate-900">1. Elegís los equipos</p>
            <p className="mt-2 text-sm text-slate-600">
              Agregalos al pedido o pedinos una recomendación según tu casa o local.
            </p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="font-semibold text-slate-900">2. Confirmamos el presupuesto</p>
            <p className="mt-2 text-sm text-slate-600">
              Te enviamos el detalle con precios finales, IVA incluido y plazo de entrega.
            </p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="font-semibold text-slate-900">3. Entregamos e instalamos</p>
            <p className="mt-2 text-sm text-slate-600">
              Coordinamos día y hora, dejamos todo funcionando y te explicamos cómo usarlo.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
