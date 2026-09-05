# Design System — ExpoJuy Vivo

Sistema de diseño placeholder (reemplazable en un archivo cuando llegue el kit oficial), inspirado
en el norte argentino.

## Fuente única de verdad

Todos los tokens viven en [`src/design-system/tokens.css`](../src/design-system/tokens.css) y se
exponen a Tailwind v4 mediante la directiva `@theme`. `globals.css` importa ese archivo. **No existe
`tailwind.config.ts`**: Tailwind v4 es CSS-first.

```
src/design-system/tokens.css   → tokens (colores, radius, shadows, easings, fuentes)
src/design-system/typography.css → estilos base de tipografía
src/app/globals.css            → @import "tailwindcss" + tokens + capa base
```

## Reglas innegociables

1. **Única fuente de verdad**: colores, spacing, radius, tipografía, breakpoints, shadows y easings
   se definen solo en `tokens.css`.
2. **Prohibido** crear `tailwind.config.ts`.
3. **Prohibido** hardcodear valores en componentes/páginas.
4. **Prohibido** usar valores arbitrarios de Tailwind (`bg-[#123456]`, `p-[13px]`, `text-[10px]`, …),
   salvo casos justificados y aislados.
5. **Prohibido** duplicar tokens entre archivos.
6. Si un valor no existe como token: se agrega primero a `tokens.css` y luego se usa.
7. **Texto de color brand**: `bg-primary` usa el cyan del kit (`#00BED2`). Para **texto** de color
   brand sobre fondo claro, usar `text-brand-text` (cyan oscurecido a AA — `#0B7382` en light,
   cyan del kit en dark). Nunca usar `text-primary` como color de texto sobre claro. Los íconos
   decorativos coloreados (isologotipo, estrellas, íconos de fase) sí conservan el cyan del kit.

### Enforcement

Biome no inspecciona el contenido de `className`, por lo que la regla #4 se hace cumplir con un guard
propio:

```bash
pnpm check:styles
```

El script [`scripts/check-styles.mjs`](../scripts/check-styles.mjs) recorre `src/**/*.{ts,tsx}` y
falla (exit 1) si encuentra utilidades con valores arbitrarios. Integrar en CI junto a
`pnpm lint && pnpm typecheck && pnpm build`.

## Paleta

Tokens semánticos (light + dark vía clase `.dark`) y marca:

| Token          | Light     | Rol                                  |
| -------------- | --------- | ------------------------------------ |
| `--primary`    | `#C2410C` | Terracota — Cerro de los Siete Colores |
| `--secondary`  | `#0E7490` | Celeste salinas                      |
| `--accent`     | `#A16207` | Ocre puna                            |
| `--background` | `#FAFAFA` | Fondo                                |
| `--foreground` | `#0A0A0A` | Texto                                |

Escala de grises `--color-neutral-50 … --color-neutral-950`. Semánticos de estado:
`--success`, `--warning`, `--error`, `--info`. Los tokens semánticos alimentan además las variables
que consume shadcn/ui (`--card`, `--muted`, `--border`, `--ring`, etc.).

## Tipografía

- Sans: **Inter** (`--font-inter` → `--font-sans`).
- Display: **Fraunces** (`--font-fraunces` → `--font-display`), para titulares con carácter regional.
- Cargadas con `next/font` en [`src/shared/config/fonts.ts`](../src/shared/config/fonts.ts).

## Dark mode

- Infra lista, **default light**.
- Estrategia por clase: `@custom-variant dark (&:is(.dark *))` en `globals.css`; los tokens se
  redefinen bajo `.dark` en `tokens.css`.
- Toggle: [`src/shared/hooks/use-theme.ts`](../src/shared/hooks/use-theme.ts) +
  `ThemeProvider`. Script anti-flash en el layout raíz.

## Animaciones

Variantes reutilizables de framer-motion en
[`src/design-system/animations.ts`](../src/design-system/animations.ts) (`fadeInUp`, `staggerContainer`,
`scaleIn`, easing de marca). Smooth scroll con Lenis (`SmoothScrollProvider`).
