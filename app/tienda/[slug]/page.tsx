import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cliente } from "@/lib/config/cliente";
import {
  getCategoria,
  getImagenProducto,
  getProducto,
  getProductosPorCategoria,
  productos,
} from "@/lib/data/productos";
import { formatearPrecio } from "@/lib/utils/formato";
import AgregarAlPedido from "@/components/tienda/AgregarAlPedido";
import ProductoCard from "@/components/tienda/ProductoCard";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return productos.map((producto) => ({ slug: producto.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const producto = getProducto(slug);
  if (!producto) return { title: `Producto no encontrado | ${cliente.marca}` };

  return {
    title: `${producto.nombre} | ${cliente.tienda.titulo}`,
    description: producto.resumen,
    alternates: { canonical: `${cliente.seo.baseUrl}/tienda/${producto.slug}` },
  };
}

export default async function ProductoDetalle({ params }: Props) {
  const { slug } = await params;
  const producto = getProducto(slug);
  if (!producto) notFound();

  const categoria = getCategoria(producto.categoria);
  const relacionados = getProductosPorCategoria(producto.categoria)
    .filter((item) => item.slug !== producto.slug)
    .slice(0, 3);

  return (
    <div className="container mx-auto p-4">
      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/tienda" className="hover:text-slate-800">
          Tienda
        </Link>
        {categoria && <span> / {categoria.nombre}</span>}
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl bg-slate-200 shadow-md">
          <img
            src={getImagenProducto(producto)}
            alt={producto.nombre}
            className="h-full max-h-[480px] w-full object-cover"
          />
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-md">
          {categoria && (
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
              {categoria.nombre}
            </p>
          )}
          <h1 className="text-3xl font-bold text-slate-900">{producto.nombre}</h1>
          {producto.marca && <p className="mt-1 text-slate-500">{producto.marca}</p>}

          <p className="mt-6 text-3xl font-bold text-slate-900">
            {formatearPrecio(producto.precio)}
          </p>
          <p className="text-sm text-slate-500">
            {producto.precio !== null
              ? `Precio final, IVA ${cliente.ivaPorcentaje}% incluido.`
              : "Te pasamos el precio del día por WhatsApp."}
          </p>

          {typeof producto.precioInstalacion === "number" && (
            <p className="mt-2 text-sm text-slate-600">
              Instalación desde {formatearPrecio(producto.precioInstalacion)}
            </p>
          )}

          <p className="mt-6 text-slate-700">{producto.descripcion || producto.resumen}</p>

          {producto.especificaciones && producto.especificaciones.length > 0 && (
            <dl className="mt-6 divide-y divide-slate-200 border-y border-slate-200">
              {producto.especificaciones.map((especificacion) => (
                <div key={especificacion.label} className="flex justify-between gap-4 py-3">
                  <dt className="text-sm text-slate-500">{especificacion.label}</dt>
                  <dd className="text-sm font-medium text-slate-900">{especificacion.valor}</dd>
                </div>
              ))}
            </dl>
          )}

          <AgregarAlPedido producto={producto} />

          <p className="mt-6 text-sm text-slate-500">{cliente.tienda.entrega}</p>
        </div>
      </div>

      {relacionados.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-semibold text-slate-900">También te puede servir</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relacionados.map((item) => (
              <ProductoCard key={item.slug} producto={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
