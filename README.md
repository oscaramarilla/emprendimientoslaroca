# AYCWEB Base Template

Plantilla base para crear sitios web de clientes usando Next.js.

## Cómo usar esta plantilla

### 1. Crear un nuevo repositorio desde la plantilla
- Ve a GitHub y selecciona "Use this template" para crear un nuevo repo.
- Clona el nuevo repo localmente.

### 2. Configurar el cliente
Edita `lib/config/cliente.ts` con los datos del cliente:
- Marca, tagline, colores
- Contacto (WhatsApp, email, horario)
- Servicios, redes sociales
- SEO (título, descripción, URL base)

### 3. Personalizar contenido
- Reemplaza imágenes en `public/` (logo.png, hero.jpg, etc.)
- Edita textos en las páginas de `app/`
- Ajusta componentes en `components/`

### 4. Variables de entorno
Copia `.env.example` a `.env.local` y configura:
- NEXT_PUBLIC_SITE_URL
- NEXT_PUBLIC_WHATSAPP
- NEXT_PUBLIC_BRAND_NAME

### 5. Desplegar en Vercel
- Importa el repo en Vercel
- Configura las variables de entorno
- Conecta el dominio

## Desarrollo local

```bash
npm install
npm run dev
```

## Estructura del proyecto

- `lib/config/cliente.ts` - Configuración del cliente
- `lib/data/productos.ts` - Catálogo y precios de la tienda
- `lib/data/presupuesto.ts` - Cálculos y texto de los presupuestos
- `components/` - Componentes reutilizables
- `app/` - Páginas Next.js
- `public/` - Imágenes y assets estáticos
- `docs/` - Guías de mantenimiento y plantilla CSV de productos

## Tienda y presupuestos

- `/tienda`, `/tienda/[producto]` y `/tienda/carrito` - Venta de cámaras, grabadores y accesorios.
- `/presupuesto` - Generador de presupuestos numerados con PDF y envío por WhatsApp.

Para cargar la lista de precios:

```bash
npm run importar-productos docs/plantilla-productos.csv
```

Ver [docs/tienda-y-presupuestos.md](docs/tienda-y-presupuestos.md) para el detalle.

## Notas
- Los colores se aplican automáticamente desde la config
- El layout incluye header y footer dinámicos
- Las páginas leen datos desde la config del cliente
