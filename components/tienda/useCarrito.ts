"use client";

import { useMemo, useSyncExternalStore } from "react";
import type { Producto } from "@/lib/data/productos";
import { getProducto } from "@/lib/data/productos";
import {
  actualizarCantidadItem,
  agregarItem,
  obtenerEstado,
  obtenerEstadoServidor,
  quitarItem,
  suscribir,
  vaciarCarrito,
  type ItemCarrito,
} from "@/lib/tienda/carritoStore";

export type LineaCarrito = ItemCarrito & {
  producto: Producto;
  /** null cuando el producto todavía no tiene precio publicado. */
  subtotal: number | null;
};

export function useCarrito() {
  const estado = useSyncExternalStore(suscribir, obtenerEstado, obtenerEstadoServidor);

  const lineas = useMemo<LineaCarrito[]>(
    () =>
      estado.items.flatMap((item) => {
        const producto = getProducto(item.slug);
        if (!producto) return [];
        const subtotal = producto.precio === null ? null : producto.precio * item.cantidad;
        return [{ ...item, producto, subtotal }];
      }),
    [estado.items]
  );

  const cantidadTotal = lineas.reduce((acc, linea) => acc + linea.cantidad, 0);
  const subtotal = lineas.reduce((acc, linea) => acc + (linea.subtotal ?? 0), 0);
  const itemsSinPrecio = lineas.filter((linea) => linea.subtotal === null).length;

  return {
    items: estado.items,
    listo: estado.listo,
    lineas,
    cantidadTotal,
    subtotal,
    itemsSinPrecio,
    agregar: agregarItem,
    quitar: quitarItem,
    actualizarCantidad: actualizarCantidadItem,
    vaciar: vaciarCarrito,
  };
}
