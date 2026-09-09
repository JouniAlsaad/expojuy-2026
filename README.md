# ExpoJuy Vivo

Propuesta de sitio web oficial para **ExpoJuy 2026**, presentada al **Desafío Digital ExpoJuy 2026**
(Cámara de Comercio Exterior de Jujuy · Ministerio de Desarrollo Económico y Producción de Jujuy).

> **Concepto — "ExpoJuy Vivo":** el sitio no es un folleto del evento, es la plataforma del evento.
> Acompaña tres tiempos: **Descubrir** (pre), **Vivir** (durante) y **Legado** (post).

Entregable de la etapa 1: **prototipo navegable** que materializa la propuesta conceptual y visual, sobre
una base arquitectónica pensada para que la etapa 2 sume features sin rehacer nada.

## Cómo ejecutarlo

Probado con **Node.js 20 LTS** y **pnpm 10**.

```bash
pnpm install
pnpm dev
```

Abre `http://localhost:3000`. Para revisar el build de producción:

```bash
pnpm build && pnpm start
```

Variables opcionales: copiar `.env.example` a `.env.local` (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SITE_NAME`).

## Cobertura de las consignas

Secciones mínimas solicitadas (consigna §5) — todas navegables:

| Sección               | Ruta                            | Implementación                                     |
| --------------------- | ------------------------------- | -------------------------------------------------- |
| Inicio                | `/`                             | Hero, countdown, tres tiempos y secciones ancladas |
| Sobre ExpoJuy 2026    | `/#sobre`                       | Información institucional y datos del evento       |
| Expositores           | `/expositores`                  | Grilla con buscador y filtro por rubro             |
| Agenda de actividades | `/agenda`                       | Timeline por jornada                               |
| Noticias              | `/noticias`, `/noticias/[slug]` | Grilla + nota individual                           |
| Plano / mapa          | `/mapa`                         | Plano SVG con zonas y ubicación del predio         |
| Sponsors              | `/sponsors`                     | Tablero por niveles (tiers)                        |
| Contacto              | `/contacto`                     | Formulario validado (zod) + canales directos       |
| Preguntas frecuentes  | `/faq`                          | Acordeón por categoría                             |
| Redes sociales        | Footer                          | Instagram y Facebook                               |

Funcionalidades sugeridas (consigna §6): buscador de expositores, agenda interactiva, mapa del predio,
filtro por rubros, formulario de contacto, panel de novedades, espacios para patrocinadores e
integración con redes — presentes en las rutas de arriba. La **gestión de entradas** se prototipa en
`/entradas`.

Valor agregado (más allá de lo pedido):

- **Ruta personalizada** (`/ruta-ia`) — arma un itinerario según intereses y tiempo disponible.
- **Matchmaking B2B** (`/matchmaking`) — solicitud de reuniones entre visitantes y expositores.
- **Asistente de consultas** (en la home) — respuestas a preguntas frecuentes del evento.
- Modo oscuro, smooth scroll, animaciones que respetan `prefers-reduced-motion` e i18n preparado.

## Stack

| Área        | Tecnología                                                         |
| ----------- | ------------------------------------------------------------------ |
| Framework   | Next.js 15 (App Router, Server Components) · TypeScript strict      |
| Estilos     | Tailwind CSS v4 (CSS-first) · tokens en CSS variables              |
| Componentes | shadcn/ui · lucide-react (íconos) · morphicons (transiciones morph) |
| Animación   | framer-motion · lenis (smooth scroll)                              |
| Validación  | zod (schemas de datos y formularios)                               |
| i18n        | next-intl (locale `es`, textos externalizados; routing en etapa 2) |
| Tooling     | Biome (lint + formato) · pnpm                                      |

## Arquitectura

**Clean Architecture por módulo** en `src/modules/<módulo>/`, con dependencias apuntando al dominio:

```
presentation ──▶ application ──▶ domain ◀── infrastructure
```

- `domain` — entidades, value objects e interfaces de repositorio. Sin dependencias de framework.
- `application` — casos de uso, DTOs y mappers.
- `infrastructure` — implementaciones concretas: repositorios que leen mocks JSON validados con zod.
- `presentation` — componentes React que consumen DTOs.

Cada página inyecta el repositorio en el caso de uso (inversión de dependencias): en la etapa 2, cambiar
el mock JSON por una API real solo requiere una nueva implementación del repositorio, sin tocar
`application`, `domain` ni `presentation`. `exhibitors` es el módulo de referencia.

Detalle en [`docs/architecture.md`](docs/architecture.md).

## Diseño y accesibilidad

- **Única fuente de verdad de estilos**: `src/design-system/tokens.css`. Todo color, radius, sombra,
  tipografía y easing vive ahí (vía `@theme` / CSS vars). No existe `tailwind.config.ts`. Un guard
  (`pnpm check:styles`) previene valores hardcodeados y arbitrarios de Tailwind.
- **Identidad del kit oficial**: paleta cyan / violeta / lavanda + charcoal y tipografía **Ambit**, con
  modo claro y oscuro (toggle con script anti-flash).
- **Objetivo WCAG 2.1 AA**: tokens con contraste suficiente, foco visible (`:focus-visible`), navegación
  por teclado, `aria-*` en controles y jerarquía semántica de headings.
- **Mobile-first** y responsive en todos los componentes.

Detalle en [`docs/design-system.md`](docs/design-system.md).

## Inteligencia artificial

La propuesta incorpora IA como parte de la experiencia, prototipada a nivel de UX en esta etapa: el
**asistente de consultas** y la **ruta personalizada** presentan el flujo completo con lógica
determinista sobre los datos del evento, y su interfaz y casos de uso quedan listos para conectar un
modelo de IA en la etapa 2 sin rehacer la UI.

Además, se usó IA como herramienta de apoyo durante el diseño y el desarrollo (ideación, prototipado y
redacción), tal como habilita el desafío.

## Datos

Todo el contenido (expositores, agenda, sponsors, noticias, entradas, FAQ, mapa) es **ficticio**,
generado solo para la demostración: cada archivo en `src/data/*.json` está marcado con `_mock: true` y
un `_disclaimer`.

## Estructura del repositorio

```
src/
├── app/(marketing)/    # Rutas públicas bajo el layout raíz (header, footer, providers)
├── modules/            # Módulos de negocio (Clean Architecture)
├── shared/             # ui, components, hooks, lib, config, types
├── design-system/      # tokens.css, typography.css, animations.ts
├── data/               # Mocks JSON (marcados como ficticios)
├── i18n/ + messages/   # Configuración next-intl + textos (es.json)
docs/                   # architecture.md, design-system.md
scripts/                # check-styles.mjs (guard del design system)
```

## Scripts

| Script              | Descripción                                    |
| ------------------- | ---------------------------------------------- |
| `pnpm dev`          | Servidor de desarrollo (Turbopack)             |
| `pnpm build`        | Build de producción                            |
| `pnpm start`        | Sirve el build                                 |
| `pnpm lint`         | Biome: lint + chequeo de formato               |
| `pnpm check`        | Biome: lint + formato con autofix              |
| `pnpm typecheck`    | `tsc --noEmit`                                 |
| `pnpm check:styles` | Guard: prohíbe valores arbitrarios de Tailwind |

Convenciones del proyecto en [`CLAUDE.md`](CLAUDE.md).
