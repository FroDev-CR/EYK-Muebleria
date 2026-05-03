# EYK Mueblería · Sitio web

Catálogo y portal de pedidos a la medida para EYK Mueblería.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind v4 · Supabase (opcional)

## Empezar

```bash
npm install
cp .env.example .env.local
# Editar .env.local con tus datos (WhatsApp, Supabase si lo usas)
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Datos de productos

Los productos se cargan desde dos fuentes (en este orden):

1. **`src/data/products.json`** — Generado a partir del PDF del catálogo. Funciona sin configurar nada más. Las imágenes están en `public/productos/<categoria>/<slug>.jpg`.
2. **Supabase** (opcional) — Si configuras `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`, los productos se leen de la tabla `products` (con fallback automático al JSON si la tabla está vacía o falla la conexión).

### Subir productos a Supabase

1. Crea el proyecto y ejecuta `supabase/schema.sql` en el SQL Editor.
2. Copia la `service_role key` (una sola vez, NO la metas en git).
3. Ejecuta:

```bash
SUPABASE_URL=https://xxx.supabase.co \
SUPABASE_SERVICE_ROLE_KEY=eyJ... \
npm run seed
```

## Pedidos a la medida

El formulario `/a-la-medida`:

1. Si Supabase está configurado, guarda el lead en la tabla `leads`.
2. Después abre WhatsApp con el mensaje formateado para el cliente.

Si no hay Supabase, usa solo WhatsApp (perfecto para empezar).

## Estructura

```
src/
├── app/
│   ├── layout.tsx         # Layout root con fonts (Spectral + Manrope)
│   ├── page.tsx           # Home
│   ├── globals.css        # Sistema de diseño (OKLCH + variables)
│   ├── catalogo/          # Catálogo + páginas de producto
│   ├── a-la-medida/       # Formulario de pedidos
│   ├── contacto/
│   └── api/leads/         # POST /api/leads → Supabase
├── components/
│   ├── nav.tsx, footer.tsx
│   ├── product-card.tsx
│   ├── category-tabs.tsx
│   ├── custom-order-form.tsx
│   └── whatsapp-button.tsx
├── lib/
│   ├── data.ts            # Categorías, contacto, helpers
│   ├── products.ts        # Data layer
│   └── supabase.ts        # Clientes Supabase
└── data/
    └── products.json      # 251 productos extraídos del PDF
```

## Sistema de diseño

Inspirado por las skills `ui-ux-pro-max` e `impeccable`:

- **Tipografía:** Spectral (display) + Manrope (body) — pareja con calidez editorial.
- **Color:** OKLCH con neutros tintados hacia walnut. Sin gradient text, sin border-left
  decorativo (banned), sin glassmorphism gratis.
- **Espaciado:** escala de 4pt con tokens semánticos.
- **Animación:** fade-rise sutil, ease-out-quart, respeta `prefers-reduced-motion`.

## Despliegue

Recomendado: [Vercel](https://vercel.com) (un click).

```bash
vercel
```

Variables de entorno a configurar en Vercel:
- `NEXT_PUBLIC_SUPABASE_URL` (opcional)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (opcional)
- `NEXT_PUBLIC_WHATSAPP` (formato internacional sin `+`, ej `50688887777`)
- `NEXT_PUBLIC_PHONE`, `NEXT_PUBLIC_EMAIL`, `NEXT_PUBLIC_INSTAGRAM`

## Licencia

Propiedad de EYK Mueblería. Todos los derechos reservados.
