"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { cliente } from "@/lib/config/cliente";
import { categorias, productos } from "@/lib/data/productos";
import {
  calcularTotales,
  fechaVencimiento,
  generarNumeroPresupuesto,
  textoPresupuesto,
  type DatosCliente,
  type ItemPresupuesto,
  type Presupuesto,
} from "@/lib/data/presupuesto";
import {
  enlaceWhatsApp,
  fechaISO,
  formatearFecha,
  formatearGs,
} from "@/lib/utils/formato";
import { useCarrito } from "@/components/tienda/useCarrito";

const CLAVE_BORRADOR = "laroca:presupuesto:v1";
const CLAVE_SECUENCIA = "laroca:presupuesto:secuencia";

const CLIENTE_VACIO: DatosCliente = { nombre: "", telefono: "", email: "", direccion: "" };

let contadorIds = 0;
function nuevoId(): string {
  contadorIds += 1;
  return `item-${Date.now()}-${contadorIds}`;
}

/** Secuencia diaria guardada en el navegador: 001, 002, 003... */
function siguienteSecuencia(hoy: string): number {
  try {
    const guardado = window.localStorage.getItem(CLAVE_SECUENCIA);
    const estado = guardado ? (JSON.parse(guardado) as { fecha: string; contador: number }) : null;
    const contador = estado && estado.fecha === hoy ? estado.contador + 1 : 1;
    window.localStorage.setItem(CLAVE_SECUENCIA, JSON.stringify({ fecha: hoy, contador }));
    return contador;
  } catch {
    return 1;
  }
}

export default function GeneradorPresupuesto() {
  const { lineas, vaciar } = useCarrito();

  const [numero, setNumero] = useState("");
  const [fecha, setFecha] = useState("");
  const [datosCliente, setDatosCliente] = useState<DatosCliente>(CLIENTE_VACIO);
  const [items, setItems] = useState<ItemPresupuesto[]>([]);
  const [descuento, setDescuento] = useState(0);
  const [observaciones, setObservaciones] = useState("");
  const [listo, setListo] = useState(false);
  const [copiado, setCopiado] = useState(false);

  // Carga del borrador y numeración automática (solo en el navegador).
  useEffect(() => {
    const hoy = fechaISO();
    let borradorCargado = false;

    try {
      const guardado = window.localStorage.getItem(CLAVE_BORRADOR);
      if (guardado) {
        const borrador = JSON.parse(guardado) as Presupuesto;
        setNumero(borrador.numero);
        setFecha(borrador.fecha);
        setDatosCliente({ ...CLIENTE_VACIO, ...borrador.cliente });
        setItems(Array.isArray(borrador.items) ? borrador.items : []);
        setDescuento(borrador.descuentoPorcentaje || 0);
        setObservaciones(borrador.observaciones || "");
        borradorCargado = true;
      }
    } catch {
      // Borrador ilegible: se arranca uno nuevo.
    }

    if (!borradorCargado) {
      setNumero(generarNumeroPresupuesto(new Date(), siguienteSecuencia(hoy)));
      setFecha(hoy);
    }

    setListo(true);
  }, []);

  // Importa el carrito cuando se llega desde /tienda/carrito.
  useEffect(() => {
    if (!listo) return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("desde") !== "carrito" || lineas.length === 0) return;

    setItems((actuales) => {
      const existentes = new Set(actuales.map((item) => item.descripcion));
      const nuevos = lineas
        .filter((linea) => !existentes.has(linea.producto.nombre))
        .map<ItemPresupuesto>((linea) => ({
          id: nuevoId(),
          descripcion: linea.producto.nombre,
          detalle: linea.producto.resumen,
          cantidad: linea.cantidad,
          precioUnitario: linea.producto.precio,
        }));
      return nuevos.length > 0 ? [...actuales, ...nuevos] : actuales;
    });

    window.history.replaceState(null, "", "/presupuesto");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listo]);

  const presupuesto = useMemo<Presupuesto>(
    () => ({
      numero,
      fecha: fecha || fechaISO(),
      validezDias: cliente.presupuesto.validezDias,
      cliente: datosCliente,
      items,
      descuentoPorcentaje: descuento,
      observaciones,
    }),
    [numero, fecha, datosCliente, items, descuento, observaciones]
  );

  // Guarda el borrador en el navegador.
  useEffect(() => {
    if (!listo) return;
    try {
      window.localStorage.setItem(CLAVE_BORRADOR, JSON.stringify(presupuesto));
    } catch {
      // Sin persistencia se sigue trabajando normalmente.
    }
  }, [presupuesto, listo]);

  const totales = calcularTotales(items, descuento);

  const agregarItem = (item: Omit<ItemPresupuesto, "id">) => {
    setItems((actuales) => [...actuales, { ...item, id: nuevoId() }]);
  };

  const actualizarItem = (id: string, cambios: Partial<ItemPresupuesto>) => {
    setItems((actuales) =>
      actuales.map((item) => (item.id === id ? { ...item, ...cambios } : item))
    );
  };

  const quitarItem = (id: string) => {
    setItems((actuales) => actuales.filter((item) => item.id !== id));
  };

  const nuevoPresupuesto = () => {
    const hoy = fechaISO();
    setNumero(generarNumeroPresupuesto(new Date(), siguienteSecuencia(hoy)));
    setFecha(hoy);
    setDatosCliente(CLIENTE_VACIO);
    setItems([]);
    setDescuento(0);
    setObservaciones("");
  };

  const copiarTexto = async () => {
    try {
      await navigator.clipboard.writeText(textoPresupuesto(presupuesto));
      setCopiado(true);
      window.setTimeout(() => setCopiado(false), 1800);
    } catch {
      setCopiado(false);
    }
  };

  if (!listo) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-md">
        <p className="text-slate-500">Preparando el generador...</p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      {/* ---------------- Formulario ---------------- */}
      <section className="no-print space-y-6">
        <div className="rounded-3xl bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">1. Datos del cliente</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-sm text-slate-600">Nombre o empresa</span>
              <input
                type="text"
                value={datosCliente.nombre}
                onChange={(e) => setDatosCliente({ ...datosCliente, nombre: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500"
                placeholder="Ej: Juan Pérez"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm text-slate-600">Teléfono</span>
              <input
                type="tel"
                value={datosCliente.telefono}
                onChange={(e) => setDatosCliente({ ...datosCliente, telefono: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500"
                placeholder="Ej: 0981 000 000"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm text-slate-600">Email (opcional)</span>
              <input
                type="email"
                value={datosCliente.email}
                onChange={(e) => setDatosCliente({ ...datosCliente, email: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500"
                placeholder="cliente@email.com"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm text-slate-600">Dirección del trabajo</span>
              <input
                type="text"
                value={datosCliente.direccion}
                onChange={(e) => setDatosCliente({ ...datosCliente, direccion: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500"
                placeholder="Barrio, ciudad"
              />
            </label>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">2. Cargar ítems</h2>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-sm text-slate-600">Producto de la tienda</span>
              <select
                value=""
                onChange={(e) => {
                  const producto = productos.find((p) => p.slug === e.target.value);
                  if (!producto) return;
                  agregarItem({
                    descripcion: producto.nombre,
                    detalle: producto.resumen,
                    cantidad: 1,
                    precioUnitario: producto.precio,
                  });
                  e.target.value = "";
                }}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500"
              >
                <option value="">Elegir producto...</option>
                {categorias.map((categoria) => (
                  <optgroup key={categoria.slug} label={categoria.nombre}>
                    {productos
                      .filter((p) => p.categoria === categoria.slug)
                      .map((producto) => (
                        <option key={producto.slug} value={producto.slug}>
                          {producto.nombre}
                        </option>
                      ))}
                  </optgroup>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block text-sm text-slate-600">Servicio</span>
              <select
                value=""
                onChange={(e) => {
                  if (!e.target.value) return;
                  agregarItem({
                    descripcion: e.target.value,
                    cantidad: 1,
                    precioUnitario: null,
                  });
                  e.target.value = "";
                }}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500"
              >
                <option value="">Elegir servicio...</option>
                {cliente.servicios.map((servicio) => (
                  <option key={servicio} value={servicio}>
                    {servicio}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-3 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() =>
                agregarItem({ descripcion: "", cantidad: 1, precioUnitario: null })
              }
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              + Línea libre
            </button>
            {lineas.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  lineas.forEach((linea) =>
                    agregarItem({
                      descripcion: linea.producto.nombre,
                      detalle: linea.producto.resumen,
                      cantidad: linea.cantidad,
                      precioUnitario: linea.producto.precio,
                    })
                  );
                  vaciar();
                }}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Traer productos del carrito ({lineas.length})
              </button>
            )}
          </div>

          <div className="mt-6 space-y-4">
            {items.length === 0 && (
              <p className="rounded-2xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
                Todavía no cargaste ítems. Elegí un producto o servicio de arriba.
              </p>
            )}

            {items.map((item, indice) => (
              <div key={item.id} className="rounded-2xl border border-slate-200 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-500">Ítem {indice + 1}</span>
                  <button
                    type="button"
                    onClick={() => quitarItem(item.id)}
                    className="text-sm text-slate-500 underline transition hover:text-red-600"
                  >
                    Quitar
                  </button>
                </div>

                <input
                  type="text"
                  value={item.descripcion}
                  onChange={(e) => actualizarItem(item.id, { descripcion: e.target.value })}
                  placeholder="Descripción del ítem"
                  className="mb-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-medium text-slate-900 outline-none transition focus:border-slate-500"
                />
                <input
                  type="text"
                  value={item.detalle ?? ""}
                  onChange={(e) => actualizarItem(item.id, { detalle: e.target.value })}
                  placeholder="Detalle o aclaración (opcional)"
                  className="mb-2 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-700 outline-none transition focus:border-slate-500"
                />

                <div className="grid grid-cols-2 gap-3">
                  <label className="block">
                    <span className="mb-1 block text-xs text-slate-500">Cantidad</span>
                    <input
                      type="number"
                      min={1}
                      value={item.cantidad}
                      onChange={(e) =>
                        actualizarItem(item.id, {
                          cantidad: Math.max(1, Number(e.target.value) || 1),
                        })
                      }
                      className="w-full rounded-xl border border-slate-300 px-4 py-2 text-slate-900 outline-none transition focus:border-slate-500"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-xs text-slate-500">
                      Precio unitario (Gs.)
                    </span>
                    <input
                      type="number"
                      min={0}
                      step={1000}
                      value={item.precioUnitario ?? ""}
                      onChange={(e) =>
                        actualizarItem(item.id, {
                          precioUnitario:
                            e.target.value === "" ? null : Math.max(0, Number(e.target.value)),
                        })
                      }
                      placeholder="A confirmar"
                      className="w-full rounded-xl border border-slate-300 px-4 py-2 text-slate-900 outline-none transition focus:border-slate-500"
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">3. Ajustes finales</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-sm text-slate-600">Descuento (%)</span>
              <input
                type="number"
                min={0}
                max={100}
                value={descuento}
                onChange={(e) =>
                  setDescuento(Math.min(100, Math.max(0, Number(e.target.value) || 0)))
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm text-slate-600">Fecha</span>
              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500"
              />
            </label>
          </div>
          <label className="mt-4 block">
            <span className="mb-1 block text-sm text-slate-600">Observaciones</span>
            <textarea
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              rows={3}
              placeholder="Plazo de entrega, condiciones de pago, trabajos excluidos..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500"
            />
          </label>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">4. Enviar o descargar</h2>
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-4 font-semibold text-white transition hover:bg-slate-800"
            >
              Descargar PDF / Imprimir
            </button>
            <a
              href={enlaceWhatsApp(textoPresupuesto(presupuesto))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white transition hover:brightness-95"
            >
              Enviar por WhatsApp
            </a>
            <button
              type="button"
              onClick={copiarTexto}
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              {copiado ? "Presupuesto copiado" : "Copiar texto del presupuesto"}
            </button>
            <button
              type="button"
              onClick={nuevoPresupuesto}
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-slate-500 underline transition hover:text-slate-800"
            >
              Empezar un presupuesto nuevo
            </button>
          </div>
          <p className="mt-4 text-xs text-slate-500">
            En &quot;Descargar PDF&quot; elegí <strong>Guardar como PDF</strong> como destino de
            impresión. El borrador queda guardado en este dispositivo.
          </p>
        </div>
      </section>

      {/* ---------------- Vista del documento ---------------- */}
      <section className="lg:sticky lg:top-6 lg:h-fit">
        <p className="no-print mb-3 text-sm font-semibold text-slate-500">Vista previa</p>

        <article className="documento-impresion rounded-3xl bg-white p-8 shadow-lg">
          <header className="flex items-start justify-between gap-4 border-b border-slate-200 pb-6">
            <div className="flex items-center gap-3">
              <img src="/images/logo.webp" alt={cliente.marca} className="h-14 w-14 object-contain" />
              <div>
                <p className="text-xl font-bold text-slate-900">{cliente.marca}</p>
                <p className="text-xs text-slate-500">{cliente.tagline}</p>
                <p className="text-xs text-slate-500">
                  WhatsApp {cliente.whatsapp} · {cliente.email}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold uppercase tracking-wide text-slate-900">
                Presupuesto
              </p>
              <p className="text-sm text-slate-600">{numero}</p>
              <p className="text-xs text-slate-500">
                Fecha: {formatearFecha(presupuesto.fecha)}
              </p>
              <p className="text-xs text-slate-500">
                Válido hasta: {formatearFecha(fechaVencimiento(presupuesto))}
              </p>
            </div>
          </header>

          <div className="border-b border-slate-200 py-4 text-sm">
            <p className="font-semibold text-slate-900">
              Cliente: {datosCliente.nombre || "—"}
            </p>
            <p className="text-slate-600">
              {[datosCliente.telefono, datosCliente.email, datosCliente.direccion]
                .filter(Boolean)
                .join(" · ") || "Sin datos de contacto cargados"}
            </p>
          </div>

          <table className="mt-4 w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-300 text-xs uppercase tracking-wide text-slate-500">
                <th className="py-2">Descripción</th>
                <th className="py-2 text-center">Cant.</th>
                <th className="py-2 text-right">Unitario</th>
                <th className="py-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-slate-400">
                    Sin ítems cargados
                  </td>
                </tr>
              )}
              {items.map((item) => (
                <tr key={item.id} className="border-b border-slate-100 align-top">
                  <td className="py-3 pr-2">
                    <p className="font-medium text-slate-900">{item.descripcion || "—"}</p>
                    {item.detalle && <p className="text-xs text-slate-500">{item.detalle}</p>}
                  </td>
                  <td className="py-3 text-center text-slate-700">{item.cantidad}</td>
                  <td className="py-3 text-right text-slate-700">
                    {item.precioUnitario === null ? "—" : formatearGs(item.precioUnitario)}
                  </td>
                  <td className="py-3 text-right font-medium text-slate-900">
                    {item.precioUnitario === null
                      ? "A confirmar"
                      : formatearGs(item.precioUnitario * item.cantidad)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 ml-auto w-full max-w-xs space-y-2 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>{formatearGs(totales.subtotal)}</span>
            </div>
            {totales.descuento > 0 && (
              <div className="flex justify-between text-slate-600">
                <span>Descuento ({descuento}%)</span>
                <span>-{formatearGs(totales.descuento)}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-slate-300 pt-2 text-lg font-bold text-slate-900">
              <span>TOTAL</span>
              <span>{formatearGs(totales.total)}</span>
            </div>
            <p className="text-right text-xs text-slate-500">
              IVA {cliente.ivaPorcentaje}% incluido: {formatearGs(totales.ivaIncluido)}
            </p>
          </div>

          {totales.itemsSinPrecio > 0 && (
            <p className="mt-4 rounded-xl bg-amber-50 p-3 text-xs text-amber-900">
              {totales.itemsSinPrecio} ítem(s) figuran como &quot;a confirmar&quot; y no están
              sumados al total.
            </p>
          )}

          {observaciones && (
            <div className="mt-6 text-sm">
              <p className="font-semibold text-slate-900">Observaciones</p>
              <p className="whitespace-pre-line text-slate-600">{observaciones}</p>
            </div>
          )}

          <footer className="mt-6 border-t border-slate-200 pt-4 text-xs text-slate-500">
            <p className="font-semibold text-slate-700">Datos para transferencia</p>
            <p>
              {cliente.datosBancarios.titular} · C.I. {cliente.datosBancarios.cedula} · Cuenta{" "}
              {cliente.datosBancarios.cuenta}
            </p>
            <p className="mt-2">{cliente.presupuesto.notaPie}</p>
            <p className="mt-1">{cliente.horario}</p>
          </footer>
        </article>

        <p className="no-print mt-4 text-center text-sm text-slate-500">
          ¿Necesitás cargar productos primero?{" "}
          <Link href="/tienda" className="underline hover:text-slate-800">
            Ir a la tienda
          </Link>
        </p>
      </section>
    </div>
  );
}
