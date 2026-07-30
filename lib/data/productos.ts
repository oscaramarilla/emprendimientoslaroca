/**
 * CATÁLOGO DE LA TIENDA — LA ROCA
 * ---------------------------------------------------------------------------
 * Este archivo es la única fuente de verdad de la tienda: productos, precios,
 * categorías y stock. La web se actualiza sola al editarlo.
 *
 * PARA CARGAR LA LISTA DE PRECIOS DE CÉSAR:
 *   1. Completar `docs/plantilla-productos.csv` (una fila por producto).
 *   2. Ejecutar: node scripts/importar-productos.mjs docs/plantilla-productos.csv
 *      El script reescribe SOLO el bloque marcado más abajo.
 *   3. Poner `catalogoEnCarga: false` en lib/config/cliente.ts.
 *
 * También se puede editar a mano el array `productos`.
 *
 * REGLAS DE PRECIO:
 *   precio: 1250000  -> se muestra "Gs. 1.250.000" y suma al carrito.
 *   precio: null     -> se muestra "Consultar precio" y no suma al total.
 *
 * Los productos cargados hoy son la estructura base acordada (sin precios
 * publicados) hasta recibir la lista definitiva.
 */

export type CategoriaTienda = {
  slug: string;
  nombre: string;
  descripcion: string;
};

export type Producto = {
  /** Identificador único en la URL: /tienda/[slug] */
  slug: string;
  nombre: string;
  /** slug de una categoría de `categorias` */
  categoria: string;
  marca?: string;
  /** Precio final con IVA incluido, en guaraníes. null = "Consultar precio". */
  precio: number | null;
  /** Precio orientativo de instalación (opcional). */
  precioInstalacion?: number | null;
  destacado?: boolean;
  disponible?: boolean;
  /** Ruta dentro de /public. Si no se define, se usa IMAGEN_POR_DEFECTO. */
  imagen?: string;
  resumen: string;
  descripcion?: string;
  especificaciones?: { label: string; valor: string }[];
};

export const IMAGEN_POR_DEFECTO = "/images/camarasydvr.webp";

export const categorias: CategoriaTienda[] = [
  {
    slug: "camaras",
    nombre: "Cámaras",
    descripcion: "Cámaras para interior y exterior, con visión nocturna y alta definición.",
  },
  {
    slug: "grabadores",
    nombre: "Grabadores (DVR / NVR)",
    descripcion: "Equipos de grabación 24/7 con acceso remoto desde el celular.",
  },
  {
    slug: "almacenamiento",
    nombre: "Discos y almacenamiento",
    descripcion: "Discos preparados para videovigilancia y grabación continua.",
  },
  {
    slug: "accesorios",
    nombre: "Accesorios e insumos",
    descripcion: "Fuentes, cables, conectores y todo lo necesario para la instalación.",
  },
  {
    slug: "kits",
    nombre: "Kits completos",
    descripcion: "Combos de cámaras, grabador y accesorios listos para instalar.",
  },
];

// === INICIO PRODUCTOS (bloque generado por scripts/importar-productos.mjs) ===
export const productos: Producto[] = [
  {
    slug: "camara-bullet-2mp-exterior",
    nombre: "Cámara bullet 2MP exterior",
    categoria: "camaras",
    precio: null,
    destacado: true,
    disponible: true,
    resumen: "Cámara exterior full HD con visión nocturna infrarroja y carcasa resistente al agua.",
    descripcion:
      "Ideal para frentes, patios y perímetros. Imagen full HD 1080p, visión nocturna infrarroja y carcasa metálica preparada para lluvia y sol directo.",
    especificaciones: [
      { label: "Resolución", valor: "1080p (2MP)" },
      { label: "Visión nocturna", valor: "Infrarroja hasta 30 m" },
      { label: "Uso", valor: "Exterior" },
    ],
  },
  {
    slug: "camara-domo-2mp-interior",
    nombre: "Cámara domo 2MP interior",
    categoria: "camaras",
    precio: null,
    disponible: true,
    resumen: "Cámara domo discreta para locales, oficinas y ambientes interiores.",
    descripcion:
      "Diseño domo de bajo perfil que se integra al cielorraso. Pensada para comercios y oficinas donde la cámara no debe llamar la atención.",
    especificaciones: [
      { label: "Resolución", valor: "1080p (2MP)" },
      { label: "Visión nocturna", valor: "Infrarroja hasta 20 m" },
      { label: "Uso", valor: "Interior" },
    ],
  },
  {
    slug: "camara-color-nocturno-5mp",
    nombre: "Cámara 5MP con color nocturno",
    categoria: "camaras",
    precio: null,
    destacado: true,
    disponible: true,
    resumen: "Graba a color también de noche gracias a su luz cálida integrada.",
    descripcion:
      "Permite identificar colores de ropa y vehículos durante la noche, algo imposible con las cámaras infrarrojas comunes. Recomendada para accesos y estacionamientos.",
    especificaciones: [
      { label: "Resolución", valor: "5MP" },
      { label: "Visión nocturna", valor: "A color con luz cálida" },
      { label: "Uso", valor: "Exterior" },
    ],
  },
  {
    slug: "camara-wifi-motorizada-interior",
    nombre: "Cámara WiFi motorizada interior",
    categoria: "camaras",
    precio: null,
    disponible: true,
    resumen: "Cámara giratoria con WiFi, audio y seguimiento de movimiento desde el celular.",
    descripcion:
      "Se conecta a la red WiFi del hogar, gira 355°, permite hablar por audio bidireccional y guarda en tarjeta de memoria o en el grabador.",
    especificaciones: [
      { label: "Conexión", valor: "WiFi" },
      { label: "Movimiento", valor: "Giro 355° / inclinación 90°" },
      { label: "Audio", valor: "Bidireccional" },
    ],
  },
  {
    slug: "dvr-4-canales",
    nombre: "DVR 4 canales",
    categoria: "grabadores",
    precio: null,
    disponible: true,
    resumen: "Grabador para instalaciones de hasta 4 cámaras, con acceso remoto.",
    descripcion:
      "Graba las 24 horas y permite ver las cámaras desde el celular. Compatible con cámaras analógicas HD.",
    especificaciones: [
      { label: "Canales", valor: "4" },
      { label: "Acceso remoto", valor: "App para celular" },
      { label: "Disco", valor: "Se vende por separado" },
    ],
  },
  {
    slug: "dvr-8-canales",
    nombre: "DVR 8 canales",
    categoria: "grabadores",
    precio: null,
    destacado: true,
    disponible: true,
    resumen: "Grabador para comercios y casas grandes, hasta 8 cámaras.",
    descripcion:
      "Pensado para instalaciones que crecen: permite empezar con 4 cámaras y sumar el resto después sin cambiar el equipo.",
    especificaciones: [
      { label: "Canales", valor: "8" },
      { label: "Acceso remoto", valor: "App para celular" },
      { label: "Disco", valor: "Se vende por separado" },
    ],
  },
  {
    slug: "nvr-8-canales-ip",
    nombre: "NVR 8 canales para cámaras IP",
    categoria: "grabadores",
    precio: null,
    disponible: true,
    resumen: "Grabador de red para cámaras IP de alta resolución.",
    descripcion:
      "Para proyectos que necesitan mayor definición y cableado de red. Admite cámaras IP con alimentación por el mismo cable (PoE).",
    especificaciones: [
      { label: "Canales", valor: "8 IP" },
      { label: "Resolución", valor: "Hasta 4K según cámara" },
      { label: "Disco", valor: "Se vende por separado" },
    ],
  },
  {
    slug: "disco-1tb-videovigilancia",
    nombre: "Disco 1TB para videovigilancia",
    categoria: "almacenamiento",
    precio: null,
    disponible: true,
    resumen: "Disco preparado para grabación continua 24/7.",
    descripcion:
      "A diferencia de un disco común de PC, está diseñado para escribir video las 24 horas sin recalentar ni fallar.",
    especificaciones: [
      { label: "Capacidad", valor: "1 TB" },
      { label: "Uso", valor: "Grabación 24/7" },
    ],
  },
  {
    slug: "disco-2tb-videovigilancia",
    nombre: "Disco 2TB para videovigilancia",
    categoria: "almacenamiento",
    precio: null,
    disponible: true,
    resumen: "El doble de días de grabación guardados.",
    descripcion:
      "Recomendado cuando se instalan 8 cámaras o más, o cuando se necesita conservar más de un mes de grabaciones.",
    especificaciones: [
      { label: "Capacidad", valor: "2 TB" },
      { label: "Uso", valor: "Grabación 24/7" },
    ],
  },
  {
    slug: "fuente-12v-5a",
    nombre: "Fuente de alimentación 12V 5A",
    categoria: "accesorios",
    precio: null,
    disponible: true,
    resumen: "Alimenta hasta 4 cámaras desde un solo punto de energía.",
    especificaciones: [
      { label: "Salida", valor: "12V 5A" },
      { label: "Cámaras", valor: "Hasta 4" },
    ],
  },
  {
    slug: "rollo-cable-utp-305m",
    nombre: "Rollo de cable UTP 305 m",
    categoria: "accesorios",
    precio: null,
    disponible: true,
    resumen: "Cable para el cableado completo de la instalación.",
    especificaciones: [
      { label: "Largo", valor: "305 m" },
      { label: "Uso", valor: "Video y datos" },
    ],
  },
  {
    slug: "pack-conectores-bnc",
    nombre: "Pack de conectores BNC",
    categoria: "accesorios",
    precio: null,
    disponible: true,
    resumen: "Conectores para el armado de las puntas de video.",
    especificaciones: [{ label: "Contenido", valor: "Pack x10" }],
  },
  {
    slug: "par-baluns-video",
    nombre: "Par de baluns de video",
    categoria: "accesorios",
    precio: null,
    disponible: true,
    resumen: "Permiten enviar la señal de video por cable UTP a mayor distancia.",
    especificaciones: [{ label: "Contenido", valor: "1 par (emisor + receptor)" }],
  },
  {
    slug: "kit-4-camaras",
    nombre: "Kit 4 cámaras + grabador",
    categoria: "kits",
    precio: null,
    precioInstalacion: null,
    destacado: true,
    disponible: true,
    resumen: "Combo completo para casa o local: 4 cámaras, grabador, fuente y cableado.",
    descripcion:
      "La opción más pedida para viviendas. Incluye 4 cámaras full HD, grabador de 4 canales, fuente, conectores y cableado. La instalación se cotiza aparte según la distancia entre puntos.",
    especificaciones: [
      { label: "Cámaras", valor: "4 x 1080p" },
      { label: "Grabador", valor: "DVR 4 canales" },
      { label: "Incluye", valor: "Fuente, conectores y cableado" },
    ],
  },
  {
    slug: "kit-8-camaras",
    nombre: "Kit 8 cámaras + grabador",
    categoria: "kits",
    precio: null,
    precioInstalacion: null,
    disponible: true,
    resumen: "Cobertura completa para comercios, depósitos y casas grandes.",
    descripcion:
      "Incluye 8 cámaras full HD, grabador de 8 canales, fuentes, conectores y cableado. Ideal para cubrir frente, fondo, laterales e interior.",
    especificaciones: [
      { label: "Cámaras", valor: "8 x 1080p" },
      { label: "Grabador", valor: "DVR 8 canales" },
      { label: "Incluye", valor: "Fuentes, conectores y cableado" },
    ],
  },
];
// === FIN PRODUCTOS (bloque generado por scripts/importar-productos.mjs) ===

export function getProducto(slug: string): Producto | undefined {
  return productos.find((p) => p.slug === slug);
}

export function getCategoria(slug: string): CategoriaTienda | undefined {
  return categorias.find((c) => c.slug === slug);
}

export function getProductosPorCategoria(slugCategoria: string): Producto[] {
  return productos.filter((p) => p.categoria === slugCategoria);
}

export function getDestacados(): Producto[] {
  return productos.filter((p) => p.destacado);
}

export function getImagenProducto(producto: Producto): string {
  return producto.imagen || IMAGEN_POR_DEFECTO;
}

/** true cuando ya hay al menos un precio cargado en el catálogo. */
export function hayPreciosCargados(): boolean {
  return productos.some((p) => typeof p.precio === "number" && p.precio > 0);
}
