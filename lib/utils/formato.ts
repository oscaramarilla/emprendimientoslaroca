import { cliente } from "@/lib/config/cliente";

/**
 * Formatea un número como guaraníes: 1250000 -> "Gs. 1.250.000".
 * Se usa una implementación manual (y no Intl) para que el resultado sea
 * idéntico en el servidor y en el navegador y no rompa la hidratación.
 */
export function formatearGs(valor: number): string {
  const entero = Math.round(Math.abs(valor));
  const signo = valor < 0 ? "-" : "";
  const conPuntos = entero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${signo}${cliente.moneda.simbolo} ${conPuntos}`;
}

/** Igual que formatearGs, pero acepta precios sin cargar. */
export function formatearPrecio(valor: number | null | undefined): string {
  if (valor === null || valor === undefined) return "Consultar precio";
  if (valor === 0) return "Consultar precio";
  return formatearGs(valor);
}

/** Fecha legible: 2026-07-30 -> "30/07/2026". */
export function formatearFecha(fecha: Date | string): string {
  const d = typeof fecha === "string" ? new Date(`${fecha}T00:00:00`) : fecha;
  const dia = `${d.getDate()}`.padStart(2, "0");
  const mes = `${d.getMonth() + 1}`.padStart(2, "0");
  return `${dia}/${mes}/${d.getFullYear()}`;
}

/** Fecha en formato ISO corto (YYYY-MM-DD) en horario local. */
export function fechaISO(fecha: Date = new Date()): string {
  const mes = `${fecha.getMonth() + 1}`.padStart(2, "0");
  const dia = `${fecha.getDate()}`.padStart(2, "0");
  return `${fecha.getFullYear()}-${mes}-${dia}`;
}

/** Suma días a una fecha ISO y devuelve otra fecha ISO. */
export function sumarDias(fechaBase: string, dias: number): string {
  const d = new Date(`${fechaBase}T00:00:00`);
  d.setDate(d.getDate() + dias);
  return fechaISO(d);
}

/** Arma el enlace de WhatsApp con el mensaje ya codificado. */
export function enlaceWhatsApp(mensaje: string): string {
  return `https://wa.me/${cliente.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}
