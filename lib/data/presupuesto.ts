import { cliente } from "@/lib/config/cliente";
import { formatearFecha, formatearGs, sumarDias } from "@/lib/utils/formato";

export type ItemPresupuesto = {
  id: string;
  descripcion: string;
  detalle?: string;
  cantidad: number;
  /** Precio unitario final con IVA incluido. null = a confirmar. */
  precioUnitario: number | null;
};

export type DatosCliente = {
  nombre: string;
  telefono: string;
  email: string;
  direccion: string;
};

export type Presupuesto = {
  numero: string;
  fecha: string; // YYYY-MM-DD
  validezDias: number;
  cliente: DatosCliente;
  items: ItemPresupuesto[];
  descuentoPorcentaje: number;
  observaciones: string;
};

export type TotalesPresupuesto = {
  subtotal: number;
  descuento: number;
  total: number;
  /** IVA contenido en el total (precios con IVA incluido: total / 11). */
  ivaIncluido: number;
  itemsSinPrecio: number;
};

/** Número correlativo legible: PRES-20260730-001 */
export function generarNumeroPresupuesto(fecha: Date, secuencia: number): string {
  const anio = fecha.getFullYear();
  const mes = `${fecha.getMonth() + 1}`.padStart(2, "0");
  const dia = `${fecha.getDate()}`.padStart(2, "0");
  const sec = `${secuencia}`.padStart(3, "0");
  return `${cliente.presupuesto.prefijo}-${anio}${mes}${dia}-${sec}`;
}

export function calcularTotales(
  items: ItemPresupuesto[],
  descuentoPorcentaje: number
): TotalesPresupuesto {
  const subtotal = items.reduce(
    (acc, item) => acc + (item.precioUnitario ?? 0) * item.cantidad,
    0
  );
  const porcentaje = Number.isFinite(descuentoPorcentaje) ? descuentoPorcentaje : 0;
  const descuento = Math.round((subtotal * porcentaje) / 100);
  const total = subtotal - descuento;
  const ivaIncluido = Math.round(total / 11);
  const itemsSinPrecio = items.filter((item) => item.precioUnitario === null).length;

  return { subtotal, descuento, total, ivaIncluido, itemsSinPrecio };
}

export function fechaVencimiento(presupuesto: Presupuesto): string {
  return sumarDias(presupuesto.fecha, presupuesto.validezDias);
}

/** Texto plano del presupuesto, listo para enviar por WhatsApp o copiar. */
export function textoPresupuesto(presupuesto: Presupuesto): string {
  const totales = calcularTotales(presupuesto.items, presupuesto.descuentoPorcentaje);
  const lineas: string[] = [];

  lineas.push(`*${cliente.marca} — Presupuesto ${presupuesto.numero}*`);
  lineas.push(`Fecha: ${formatearFecha(presupuesto.fecha)}`);
  lineas.push(`Válido hasta: ${formatearFecha(fechaVencimiento(presupuesto))}`);

  if (presupuesto.cliente.nombre) lineas.push(`Cliente: ${presupuesto.cliente.nombre}`);
  if (presupuesto.cliente.direccion) lineas.push(`Dirección: ${presupuesto.cliente.direccion}`);

  lineas.push("");
  lineas.push("*Detalle:*");

  presupuesto.items.forEach((item, indice) => {
    const precio =
      item.precioUnitario === null
        ? "a confirmar"
        : formatearGs(item.precioUnitario * item.cantidad);
    lineas.push(`${indice + 1}. ${item.descripcion} x${item.cantidad} — ${precio}`);
    if (item.detalle) lineas.push(`   ${item.detalle}`);
  });

  lineas.push("");
  lineas.push(`Subtotal: ${formatearGs(totales.subtotal)}`);
  if (totales.descuento > 0) {
    lineas.push(
      `Descuento (${presupuesto.descuentoPorcentaje}%): -${formatearGs(totales.descuento)}`
    );
  }
  lineas.push(`*TOTAL: ${formatearGs(totales.total)}*`);
  lineas.push(`(IVA ${cliente.ivaPorcentaje}% incluido: ${formatearGs(totales.ivaIncluido)})`);

  if (totales.itemsSinPrecio > 0) {
    lineas.push("");
    lineas.push(
      `Nota: ${totales.itemsSinPrecio} ítem(s) quedan a confirmar y no están sumados al total.`
    );
  }

  if (presupuesto.observaciones) {
    lineas.push("");
    lineas.push(`Observaciones: ${presupuesto.observaciones}`);
  }

  lineas.push("");
  lineas.push(cliente.presupuesto.notaPie);

  return lineas.join("\n");
}
