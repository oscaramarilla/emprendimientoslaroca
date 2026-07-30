import { getProducto } from "@/lib/data/productos";

export type ItemCarrito = {
  slug: string;
  cantidad: number;
};

export type EstadoCarrito = {
  items: ItemCarrito[];
  /** false hasta que se leyó el pedido guardado en el navegador. */
  listo: boolean;
};

const CLAVE_STORAGE = "laroca:carrito:v1";

/** Estado usado en el servidor y en la primera renderización del cliente. */
const ESTADO_INICIAL: EstadoCarrito = { items: [], listo: false };

let estado: EstadoCarrito = ESTADO_INICIAL;
let cargado = false;
const oyentes = new Set<() => void>();

function emitir() {
  oyentes.forEach((oyente) => oyente());
}

function leerStorage(): ItemCarrito[] {
  try {
    const guardado = window.localStorage.getItem(CLAVE_STORAGE);
    if (!guardado) return [];

    const parseado = JSON.parse(guardado) as ItemCarrito[];
    if (!Array.isArray(parseado)) return [];

    // Se descartan productos que ya no existen en el catálogo.
    return parseado
      .filter((item) => item && typeof item.slug === "string" && getProducto(item.slug))
      .map((item) => ({
        slug: item.slug,
        cantidad: Math.max(1, Math.trunc(Number(item.cantidad)) || 1),
      }));
  } catch {
    return [];
  }
}

function escribirStorage(items: ItemCarrito[]) {
  try {
    window.localStorage.setItem(CLAVE_STORAGE, JSON.stringify(items));
  } catch {
    // Si el navegador bloquea el storage, el pedido vive solo en esta sesión.
  }
}

function cargarUnaVez() {
  if (cargado) return;
  cargado = true;
  estado = { items: leerStorage(), listo: true };

  // Mantiene el pedido sincronizado si el cliente abre la tienda en otra pestaña.
  window.addEventListener("storage", (evento) => {
    if (evento.key !== CLAVE_STORAGE) return;
    estado = { items: leerStorage(), listo: true };
    emitir();
  });
}

export function suscribir(oyente: () => void): () => void {
  cargarUnaVez();
  oyentes.add(oyente);
  return () => {
    oyentes.delete(oyente);
  };
}

export function obtenerEstado(): EstadoCarrito {
  return estado;
}

export function obtenerEstadoServidor(): EstadoCarrito {
  return ESTADO_INICIAL;
}

function establecer(items: ItemCarrito[]) {
  estado = { items, listo: true };
  escribirStorage(items);
  emitir();
}

export function agregarItem(slug: string, cantidad = 1) {
  const existente = estado.items.find((item) => item.slug === slug);
  if (existente) {
    establecer(
      estado.items.map((item) =>
        item.slug === slug ? { ...item, cantidad: item.cantidad + cantidad } : item
      )
    );
    return;
  }
  establecer([...estado.items, { slug, cantidad }]);
}

export function quitarItem(slug: string) {
  establecer(estado.items.filter((item) => item.slug !== slug));
}

export function actualizarCantidadItem(slug: string, cantidad: number) {
  if (cantidad <= 0) {
    quitarItem(slug);
    return;
  }
  establecer(
    estado.items.map((item) => (item.slug === slug ? { ...item, cantidad } : item))
  );
}

export function vaciarCarrito() {
  establecer([]);
}
