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
- `components/` - Componentes reutilizables
- `app/` - Páginas Next.js
- `public/` - Imágenes y assets estáticos

## Notas
- Los colores se aplican automáticamente desde la config
- El layout incluye header y footer dinámicos
- Las páginas leen datos desde la config del cliente
