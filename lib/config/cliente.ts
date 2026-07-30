export const cliente = {
  // Brand
  marca: "LA ROCA",
  tagline: "Servicios integrales para hogar, comercio y obra",

  // Contact
  whatsapp: "595982368251",
  email: "cesarcent85@gmail.com",
  horario: "Lunes a Sábados de 07:30 a 18:00 hs",

  // Visual
  colores: {
    primary: "#0f172a",
    accent: "#f59e0b",
    background: "#ffffff",
    foreground: "#000000",
  },

  // SEO
  seo: {
    title: "LA ROCA - Servicios integrales",
    description: "Climatización, terminaciones, seguridad y obras especiales",
    baseUrl: "https://larocaemprendimientos.com",
  },

  // Content
  servicios: [
    "Venta de materiales eléctricos",
    "Instalación y venta de cámaras de seguridad",
    "Instalación y mantenimiento de aire acondicionado",
    "Servicios de pintura en general",
    "Placas antihumedad",
    "Construcción e instalación de piscinas",
    "Cerca eléctrica perimetral",
    "Colocación de Durlock (Tabiquería seca)",
    "Plomería",
    "Servicio integral para la construcción",
  ],
  redes: [
    { name: "Facebook", url: "https://www.facebook.com" },
    { name: "Instagram", url: "https://www.instagram.com" },
    { name: "Twitter", url: "https://www.twitter.com" },
  ],
  navegacion: ["Inicio", "Servicios", "Tienda", "Nosotros", "Pagos", "Contacto"],

  // Datos comerciales (tienda y presupuestos)
  moneda: {
    codigo: "PYG",
    simbolo: "Gs.",
  },

  // En Paraguay los precios se publican con IVA incluido (10%).
  // El IVA contenido en un precio final se calcula como total / 11.
  ivaPorcentaje: 10,

  presupuesto: {
    prefijo: "PRES",
    validezDias: 15,
    notaPie:
      "Precios expresados en guaraníes con IVA incluido. El presupuesto no incluye trabajos no detallados en este documento.",
  },

  tienda: {
    titulo: "Tienda La Roca",
    subtitulo:
      "Cámaras de seguridad, grabadores, discos y accesorios con instalación profesional a cargo de nuestro equipo.",
    entrega:
      "Retiro sin costo en nuestro depósito o envío coordinado por WhatsApp.",
    // Mientras esté en true, el catálogo muestra el aviso de "lista de precios en carga".
    // Cambiar a false cuando estén cargados los precios definitivos de César.
    catalogoEnCarga: true,
  },

  // Datos bancarios usados en la página de Pagos y al pie de los presupuestos
  datosBancarios: {
    titular: "CENTURION MENDEZ, CESAR DAVID",
    cedula: "4225312",
    cuenta: "81-25682",
  },
};
