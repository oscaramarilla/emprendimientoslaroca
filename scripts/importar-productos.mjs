#!/usr/bin/env node
/**
 * Importador de la lista de precios a la tienda.
 *
 *   node scripts/importar-productos.mjs docs/plantilla-productos.csv
 *
 * Lee el CSV y reescribe SOLO el bloque de productos de lib/data/productos.ts,
 * dejando intactos los tipos, las categorías y las funciones auxiliares.
 *
 * Columnas esperadas (el orden no importa, los nombres sí):
 *   slug, nombre, categoria, marca, precio, precioInstalacion,
 *   destacado, disponible, imagen, resumen, descripcion, especificaciones
 *
 * Notas:
 *   - precio vacío  -> el producto muestra "Consultar precio".
 *   - precio acepta 350000, 350.000 o Gs. 350.000.
 *   - destacado/disponible aceptan si/no, true/false, 1/0.
 *   - especificaciones: "Resolución:1080p|Uso:Exterior".
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const ARCHIVO_DESTINO = resolve("lib/data/productos.ts");
const MARCA_INICIO = "// === INICIO PRODUCTOS (bloque generado por scripts/importar-productos.mjs) ===";
const MARCA_FIN = "// === FIN PRODUCTOS (bloque generado por scripts/importar-productos.mjs) ===";
const CATEGORIAS_VALIDAS = ["camaras", "grabadores", "almacenamiento", "accesorios", "kits"];

function parsearCSV(texto) {
  const filas = [];
  let campo = "";
  let fila = [];
  let entreComillas = false;

  const contenido = texto.replace(/^﻿/, "").replace(/\r\n/g, "\n");

  for (let i = 0; i < contenido.length; i += 1) {
    const caracter = contenido[i];

    if (entreComillas) {
      if (caracter === '"') {
        if (contenido[i + 1] === '"') {
          campo += '"';
          i += 1;
        } else {
          entreComillas = false;
        }
      } else {
        campo += caracter;
      }
      continue;
    }

    if (caracter === '"') entreComillas = true;
    else if (caracter === ",") {
      fila.push(campo);
      campo = "";
    } else if (caracter === "\n") {
      fila.push(campo);
      filas.push(fila);
      fila = [];
      campo = "";
    } else campo += caracter;
  }

  if (campo.length > 0 || fila.length > 0) {
    fila.push(campo);
    filas.push(fila);
  }

  return filas.filter((f) => f.some((valor) => valor.trim() !== ""));
}

function aSlug(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(new RegExp("[\\u0300-\\u036f]", "g"), "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function aNumero(valor) {
  const limpio = String(valor ?? "").replace(/[^\d]/g, "");
  if (limpio === "") return null;
  const numero = Number(limpio);
  return Number.isFinite(numero) && numero > 0 ? numero : null;
}

function aBooleano(valor, porDefecto) {
  const texto = String(valor ?? "").trim().toLowerCase();
  if (texto === "") return porDefecto;
  return ["si", "sí", "true", "1", "x", "yes"].includes(texto);
}

function comillas(texto) {
  return JSON.stringify(String(texto ?? ""));
}

function main() {
  const rutaCSV = process.argv[2];
  if (!rutaCSV) {
    console.error("Uso: node scripts/importar-productos.mjs <archivo.csv>");
    process.exit(1);
  }

  const filas = parsearCSV(readFileSync(resolve(rutaCSV), "utf8"));
  if (filas.length < 2) {
    console.error("El CSV no tiene filas de productos.");
    process.exit(1);
  }

  const encabezados = filas[0].map((h) => h.trim());
  const indice = (nombre) => encabezados.indexOf(nombre);
  const columnasObligatorias = ["nombre", "categoria"];
  const faltantes = columnasObligatorias.filter((columna) => indice(columna) === -1);

  if (faltantes.length > 0) {
    console.error(`Faltan columnas obligatorias en el CSV: ${faltantes.join(", ")}`);
    process.exit(1);
  }

  const avisos = [];
  const slugsUsados = new Set();

  const productos = filas.slice(1).map((fila, numeroFila) => {
    const dato = (columna) => {
      const i = indice(columna);
      return i === -1 ? "" : String(fila[i] ?? "").trim();
    };

    const nombre = dato("nombre");
    let slug = dato("slug") || aSlug(nombre);
    if (slugsUsados.has(slug)) {
      avisos.push(`Fila ${numeroFila + 2}: slug duplicado "${slug}", se renombró.`);
      slug = `${slug}-${numeroFila + 2}`;
    }
    slugsUsados.add(slug);

    const categoria = dato("categoria");
    if (!CATEGORIAS_VALIDAS.includes(categoria)) {
      avisos.push(
        `Fila ${numeroFila + 2}: categoría "${categoria}" no existe (válidas: ${CATEGORIAS_VALIDAS.join(", ")}).`
      );
    }

    const especificaciones = dato("especificaciones")
      .split("|")
      .map((parte) => parte.trim())
      .filter(Boolean)
      .map((parte) => {
        const separador = parte.indexOf(":");
        if (separador === -1) return { label: "Detalle", valor: parte };
        return {
          label: parte.slice(0, separador).trim(),
          valor: parte.slice(separador + 1).trim(),
        };
      });

    return {
      slug,
      nombre,
      categoria,
      marca: dato("marca") || undefined,
      precio: aNumero(dato("precio")),
      precioInstalacion: aNumero(dato("precioInstalacion")),
      destacado: aBooleano(dato("destacado"), false),
      disponible: aBooleano(dato("disponible"), true),
      imagen: dato("imagen") || undefined,
      resumen: dato("resumen"),
      descripcion: dato("descripcion") || undefined,
      especificaciones,
    };
  });

  const cuerpo = productos
    .map((producto) => {
      const lineas = [];
      lineas.push("  {");
      lineas.push(`    slug: ${comillas(producto.slug)},`);
      lineas.push(`    nombre: ${comillas(producto.nombre)},`);
      lineas.push(`    categoria: ${comillas(producto.categoria)},`);
      if (producto.marca) lineas.push(`    marca: ${comillas(producto.marca)},`);
      lineas.push(`    precio: ${producto.precio === null ? "null" : producto.precio},`);
      if (producto.precioInstalacion !== null) {
        lineas.push(`    precioInstalacion: ${producto.precioInstalacion},`);
      }
      if (producto.destacado) lineas.push("    destacado: true,");
      lineas.push(`    disponible: ${producto.disponible},`);
      if (producto.imagen) lineas.push(`    imagen: ${comillas(producto.imagen)},`);
      lineas.push(`    resumen: ${comillas(producto.resumen)},`);
      if (producto.descripcion) lineas.push(`    descripcion: ${comillas(producto.descripcion)},`);
      if (producto.especificaciones.length > 0) {
        lineas.push("    especificaciones: [");
        producto.especificaciones.forEach((especificacion) => {
          lineas.push(
            `      { label: ${comillas(especificacion.label)}, valor: ${comillas(especificacion.valor)} },`
          );
        });
        lineas.push("    ],");
      }
      lineas.push("  },");
      return lineas.join("\n");
    })
    .join("\n");

  const bloque = `${MARCA_INICIO}\nexport const productos: Producto[] = [\n${cuerpo}\n];\n${MARCA_FIN}`;

  const archivo = readFileSync(ARCHIVO_DESTINO, "utf8");
  const inicio = archivo.indexOf(MARCA_INICIO);
  const fin = archivo.indexOf(MARCA_FIN);

  if (inicio === -1 || fin === -1) {
    console.error(
      "No se encontraron las marcas del bloque generado en lib/data/productos.ts. No se modificó nada."
    );
    process.exit(1);
  }

  const nuevoArchivo =
    archivo.slice(0, inicio) + bloque + archivo.slice(fin + MARCA_FIN.length);

  writeFileSync(ARCHIVO_DESTINO, nuevoArchivo, "utf8");

  const conPrecio = productos.filter((p) => p.precio !== null).length;
  console.log(`✔ ${productos.length} productos importados (${conPrecio} con precio cargado).`);
  avisos.forEach((aviso) => console.warn(`⚠ ${aviso}`));
  if (conPrecio > 0) {
    console.log("→ Recordá poner tienda.catalogoEnCarga: false en lib/config/cliente.ts");
  }
}

main();
