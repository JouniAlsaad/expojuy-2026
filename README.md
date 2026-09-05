# ExpoJuy Vivo

Propuesta de sitio web oficial para **ExpoJuy 2026**, presentada al **Desafío Digital ExpoJuy 2026**
(Cámara de Comercio Exterior de Jujuy).

> **Concepto:** el sitio no es un folleto del evento, es una plataforma con tres tiempos —
> **Descubrir** (pre-evento), **Vivir** (durante) y **Legado** (post-evento).

Esta etapa entrega el mockup navegable + memoria descriptiva, dejando la base arquitectónica lista para
que la etapa 2 sume features sin rehacer nada.

## Stack

| Área          | Tecnología                                            |
| ------------- | ----------------------------------------------------- |
| Framework     | Next.js 15 (App Router) · TypeScript strict           |
| Estilos       | Tailwind CSS v4 (CSS-first) · tokens en CSS variables |
| Componentes   | shadcn/ui · lucide-react · morphicons                 |
| Animación     | framer-motion · lenis (smooth scroll)                 |
| Validación    | zod                                                   |
| i18n          | next-intl (locale `es`, sin routing todavía)          |
| Tooling       | Biome (lint + formato) · pnpm                         |

## Requisitos

- Node.js ≥ 20
- pnpm ≥ 10

## Setup local

```bash
pnpm install
pnpm dev
```

App en `http://localhost:3000`. Copiar `.env.example` a `.env.local` si se necesitan variables.

## Scripts

| Script               | Descripción                                        |
| -------------------- | -------------------------------------------------- |
| `pnpm dev`           | Servidor de desarrollo (Turbopack)                 |
| `pnpm build`         | Build de producción                                |
| `pnpm start`         | Sirve el build                                     |
| `pnpm lint`          | Biome: lint + chequeo de formato                   |
| `pnpm format`        | Biome: formatea in-place                           |
| `pnpm check`         | Biome: lint + formato con autofix                  |
| `pnpm typecheck`     | `tsc --noEmit`                                      |
| `pnpm check:styles`  | Guard: prohíbe valores arbitrarios de Tailwind     |

## Estructura

```
src/
├── app/
│   ├── (marketing)/        # Home + páginas públicas (expositores, agenda, mapa, …)
│   ├── layout.tsx          # Layout raíz: fuentes, i18n, theme, smooth scroll, header/footer
│   ├── globals.css         # @import tailwindcss + tokens + capa base
│   └── not-found.tsx
├── modules/                # Clean Architecture por módulo
│   ├── exhibitors/         # Módulo de referencia (implementación completa)
│   ├── agenda/ venue-map/ news/ sponsors/ contact/   # Estructura + README
├── shared/                 # ui, components, hooks, lib, config, types
├── design-system/          # tokens.css, typography.css, animations.ts
└── data/                   # Mocks JSON (marcados como ficticios)
docs/                       # architecture.md, design-system.md
```

Detalle en [`docs/architecture.md`](docs/architecture.md) y
[`docs/design-system.md`](docs/design-system.md). Convenciones en [`CLAUDE.md`](CLAUDE.md).

## Qué está listo

- Proyecto Next.js 15 + Tailwind v4 CSS-first + Biome + pnpm, con `build`/`lint`/`typecheck` en verde.
- Design system con tokens como única fuente de verdad (light + dark, toggle funcional).
- Layout responsive mobile-first: header con nav, footer institucional, menú mobile con morph
  hamburguesa ↔ X (morphicons), smooth scroll (Lenis).
- Home con hero, los tres tiempos y secciones ancladas.
- Módulo `exhibitors` completo (domain → application → infrastructure → presentation) consumido en
  `/expositores` desde mocks validados con zod.
- i18n dormido (next-intl, locale `es`) con textos ya externalizados a `messages/es.json`.
- Mocks de expositores, agenda, sponsors y noticias.

## Qué queda para la etapa 2

- Implementar los módulos `agenda`, `venue-map`, `news`, `sponsors`, `contact` sobre el patrón de
  `exhibitors`.
- Mapa del predio en tiempo real y "qué pasa ahora".
- Ruta personalizada con IA, matchmaking B2B y contenidos on-demand.
- Activar multi-idioma (middleware + segmento `[locale]`).
- Integrar backend/CMS real reemplazando los repositorios JSON.
- Reemplazar la paleta placeholder por el kit de marca oficial.

## Nota sobre los datos

Todo el contenido (expositores, agenda, sponsors, noticias) es **ficticio**, marcado con `_mock` y el
sufijo `(ficticio)`, generado solo para la demostración del concurso.
