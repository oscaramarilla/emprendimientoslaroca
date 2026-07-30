# Tienda online y generador de presupuestos

Guía corta para mantener la tienda (`/tienda`) y el generador de presupuestos
(`/presupuesto`) del sitio de LA ROCA.

---

## 1. Cargar la lista de productos y precios de César

### Opción A — CSV (recomendada cuando son muchos productos)

1. Abrí `docs/plantilla-productos.csv` con Excel o Google Sheets.
2. Completá una fila por producto. Columnas:

| Columna | Obligatoria | Ejemplo | Notas |
|---|---|---|---|
| `slug` | no | `camara-bullet-2mp-exterior` | Si se deja vacío se genera desde el nombre. Es la URL del producto. |
| `nombre` | **sí** | `Cámara bullet 2MP exterior` | |
| `categoria` | **sí** | `camaras` | Solo: `camaras`, `grabadores`, `almacenamiento`, `accesorios`, `kits` |
| `marca` | no | `Hikvision` | |
| `precio` | no | `350000` | Precio final con IVA. Vacío = "Consultar precio". Acepta `Gs. 350.000`. |
| `precioInstalacion` | no | `150000` | Precio orientativo de instalación. |
| `destacado` | no | `si` | Muestra la etiqueta "Más pedido". |
| `disponible` | no | `si` | |
| `imagen` | no | `/images/productos/camara.webp` | Ruta dentro de `public/`. |
| `resumen` | no | Frase corta | Es lo que se ve en la tarjeta del catálogo. |
| `descripcion` | no | Texto largo | Se ve en la ficha del producto. |
| `especificaciones` | no | `Resolución:1080p|Uso:Exterior` | Pares `etiqueta:valor` separados por `|`. |

3. Importá el CSV:

```bash
npm run importar-productos docs/plantilla-productos.csv
```

4. Cuando los precios ya sean definitivos, editá `lib/config/cliente.ts` y poné
   `tienda.catalogoEnCarga: false` para que desaparezca el cartel de
   "estamos cargando la lista de precios".

El script reescribe **solo** el bloque marcado entre
`// === INICIO PRODUCTOS ... ===` y `// === FIN PRODUCTOS ... ===` dentro de
`lib/data/productos.ts`. Categorías, tipos y funciones quedan intactos.

### Opción B — a mano

Editar directamente el array `productos` de `lib/data/productos.ts`. Cada producto
sigue el tipo `Producto` definido en ese mismo archivo.

### Imágenes de producto

Guardar las fotos en `public/images/productos/` (formato `.webp`, ~800px de ancho)
y apuntar a ellas con la columna `imagen`. Los productos sin imagen usan
`/images/camarasydvr.webp` como respaldo.

---

## 2. Cómo funciona la tienda

- `/tienda` — catálogo con buscador y filtro por categoría.
- `/tienda/[slug]` — ficha del producto con especificaciones y cantidad.
- `/tienda/carrito` — pedido armado por el cliente.

El pedido **no cobra online**: el cliente arma el carrito y lo envía por WhatsApp
con el detalle y el subtotal ya formateados, o lo convierte en un presupuesto PDF.
Es el mismo circuito que ya usa César (WhatsApp + transferencia), sin comisiones
de pasarela ni datos de tarjeta en el sitio.

El carrito se guarda en el navegador del cliente (`localStorage`), así que no se
pierde si cierra la pestaña.

> Si más adelante se quiere cobro online (Pagopar, Bancard, Tigo Money), se
> agrega como paso extra en el carrito sin rehacer nada de lo anterior.

---

## 3. Generador de presupuestos (`/presupuesto`)

Reemplaza el presupuesto escrito a mano. En una sola pantalla:

1. **Datos del cliente** — nombre, teléfono, email y dirección.
2. **Ítems** — se cargan desde:
   - el catálogo de la tienda (trae nombre y precio),
   - la lista de servicios de `cliente.servicios`,
   - o una línea libre escrita a mano,
   - o directamente desde el carrito.
3. **Ajustes** — descuento en %, fecha y observaciones.
4. **Salida** — PDF (imprimir → *Guardar como PDF*), WhatsApp o copiar texto.

Automatiza:

- **Numeración**: `PRES-AAAAMMDD-001`, con contador diario en el dispositivo.
- **Fecha de validez**: fecha + `presupuesto.validezDias` (hoy 15 días).
- **Totales**: subtotal, descuento e IVA 10% **incluido** (total ÷ 11, que es la
  forma correcta en Paraguay cuando los precios ya llevan IVA).
- **Pie**: datos bancarios y condiciones desde `lib/config/cliente.ts`.

Los ítems sin precio se muestran como "a confirmar" y **no** se suman al total,
para no publicar un total equivocado.

El borrador se guarda solo en el navegador; "Empezar un presupuesto nuevo" lo
limpia y toma el siguiente número.

---

## 4. Qué se toca para cambiar cada cosa

| Quiero cambiar... | Archivo |
|---|---|
| Menú, marca, WhatsApp, email, horario | `lib/config/cliente.ts` |
| Días de validez del presupuesto, nota al pie | `lib/config/cliente.ts` → `presupuesto` |
| Datos bancarios del pie del presupuesto | `lib/config/cliente.ts` → `datosBancarios` |
| Textos de la tienda / cartel de precios | `lib/config/cliente.ts` → `tienda` |
| Productos y precios | `lib/data/productos.ts` (o el CSV) |
| Categorías de la tienda | `lib/data/productos.ts` → `categorias` |
| Cálculo de totales / texto de WhatsApp | `lib/data/presupuesto.ts` |

---

## 5. Probar en local

```bash
npm run dev
```

Y abrir http://localhost:3000/tienda y http://localhost:3000/presupuesto.
