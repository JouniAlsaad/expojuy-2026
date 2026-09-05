# CLAUDE.md — Convenciones del proyecto ExpoJuy Vivo

Guía para agentes y personas que trabajen en este repositorio. Leer antes de tocar código.

## Contexto

Sitio "ExpoJuy Vivo" para el **Desafío Digital ExpoJuy 2026**. Concepto: no es un folleto del
evento, es una plataforma con tres tiempos: **Descubrir** (pre), **Vivir** (durante), **Legado** (post).
Etapa actual: mockup + memoria descriptiva, dejando la base lista para que la etapa 2 sume features
sin rehacer nada.

## Stack

- Next.js 15 (App Router) + TypeScript strict
- Tailwind CSS v4 (CSS-first, sin `tailwind.config.ts`)
- shadcn/ui (base de componentes) + lucide-react (íconos) + morphicons (íconos morph)
- framer-motion (animaciones) + lenis (smooth scroll)
- zod (validación) + next-intl (i18n, configurado en `es`, sin routing todavía)
- Biome (lint + formato) · pnpm (gestor)

## Arquitectura

- **Clean Architecture por módulo** en `src/modules/<módulo>/`: `domain → application → infrastructure → presentation`.
  - `domain`: entidades, value objects, interfaces de repositorio. Sin dependencias de framework.
  - `application`: casos de uso, DTOs, mappers. Orquesta el dominio.
  - `infrastructure`: implementaciones concretas (repositorios JSON, schemas zod).
  - `presentation`: componentes React del módulo.
- **Módulo de referencia**: `src/modules/exhibitors` (implementación completa). Replicar ese patrón.
- **SOLID** donde aporte valor real (no forzar). Composición sobre herencia.
- **Barrel exports** (`index.ts`) por capa y por módulo.
- **Path aliases**: `@/modules`, `@/shared`, `@/design-system`, `@/data` (y `@/*` → `src/*`).

## Reglas de estilo — INNEGOCIABLES

- **Única fuente de verdad de estilos**: `src/design-system/tokens.css`. Todo color, spacing, radius,
  tipografía, breakpoint, shadow y easing vive ahí (vía `@theme` / CSS vars), importado por `globals.css`.
- **Prohibido**: crear `tailwind.config.ts`, hardcodear valores en componentes, o usar valores
  arbitrarios de Tailwind (`bg-[#123]`, `p-[13px]`, `text-[10px]`, etc.).
- Si un valor no existe como token: primero se agrega a `tokens.css`, después se usa.
- Enforcement: `pnpm check:styles` (falla si detecta valores arbitrarios). Ver `docs/design-system.md`.
- Consumo de tokens: clases utility de Tailwind (`bg-primary`, `text-muted-foreground`) o `var(--token)`.

## Reglas de código

- **TypeScript strict**. Prohibido `any` y `@ts-ignore`/`@ts-expect-error`.
- **Sin comentarios en el código**. Nombres autoexplicativos.
- Componentes React funcionales con **tipado explícito de props** (interface por componente).
- **Server Components por defecto**; `"use client"` solo cuando sea imprescindible (estado, efectos, eventos).
- Archivos en **kebab-case**; componentes React en **PascalCase**.
- Imports de solo-tipo con `import type` (lo exige Biome).

## i18n (next-intl)

- Locale único `es` por ahora (sin middleware ni segmento `[locale]`).
- Todo texto visible se consume con `useTranslations` (cliente) o `getTranslations` (servidor) contra
  `src/messages/es.json`. No hardcodear strings de UI en componentes.
- Etapa 2: se activa routing/middleware sin tocar los textos.

## Accesibilidad

- Objetivo **WCAG 2.1 AA**: contraste suficiente, foco visible (`:focus-visible`), navegación por teclado,
  `aria-*` en controles (menú mobile, toggles), textos alternativos, jerarquía semántica de headings.
- Mobile-first y responsive en todos los componentes.

## Datos mock

- En `src/data/*.json`. Siempre marcados con `_mock: true` + `_disclaimer`, nombres con sufijo
  `(ficticio)`. No inventar expositores/agenda/sponsors reales.

## Comandos

- `pnpm dev` — desarrollo (Turbopack)
- `pnpm build` — build de producción
- `pnpm lint` — Biome (lint + formato check)
- `pnpm format` — Biome formatea in-place
- `pnpm check` — Biome lint+formato con autofix
- `pnpm typecheck` — `tsc --noEmit`
- `pnpm check:styles` — guard anti valores arbitrarios de Tailwind

**Antes de dar por terminada cualquier tarea**: `pnpm lint && pnpm typecheck && pnpm build` deben pasar
sin errores ni warnings.

## Commits

- Atómicos, formato convencional: `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, `style:`, `test:`.
