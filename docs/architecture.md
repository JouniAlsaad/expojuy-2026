# Arquitectura — ExpoJuy Vivo

## Objetivo

Base productiva, no un folleto. La etapa 2 debe **sumar features sobre esta base**, no rehacerla.
Por eso adoptamos Clean Architecture por módulo, tokens como única fuente de verdad e i18n preparado.

## Capas por módulo

Cada módulo en `src/modules/<módulo>/` se organiza en cuatro capas con dependencias hacia adentro:

```
presentation ──▶ application ──▶ domain ◀── infrastructure
```

- **domain** — Reglas y modelos puros del negocio: entidades, value objects e interfaces de
  repositorio. Sin dependencias de Next, React ni librerías externas. Es el núcleo estable.
- **application** — Casos de uso que orquestan el dominio, más DTOs y mappers que traducen entidades
  a estructuras serializables para la UI. Depende solo de `domain`.
- **infrastructure** — Implementaciones concretas de las interfaces del dominio: repositorios que leen
  los mocks JSON, validados con zod. Depende de `domain`.
- **presentation** — Componentes React del módulo, que consumen DTOs (no entidades).

Regla clave: **las dependencias apuntan al dominio**. `domain` no conoce a nadie; `infrastructure` y
`application` dependen de `domain`; `presentation` consume `application`.

## Módulo de referencia: `exhibitors`

Implementación completa que sirve de plantilla arquitectónica:

```
modules/exhibitors/
├── domain/
│   ├── exhibitor.entity.ts           # Entidad raíz (encapsulada, factory create)
│   ├── exhibitor-id.vo.ts            # Value object con validación
│   ├── exhibitor-category.vo.ts      # Value object + slugs permitidos
│   ├── booth-location.vo.ts          # Value object (pabellón + stand)
│   └── exhibitor.repository.ts       # Interface (puerto)
├── application/
│   ├── exhibitor.dto.ts              # Estructura serializable para la UI
│   ├── exhibitor.mapper.ts           # Entidad → DTO
│   ├── get-exhibitors.use-case.ts
│   ├── get-exhibitor-by-id.use-case.ts
│   └── filter-exhibitors-by-category.use-case.ts
├── infrastructure/
│   ├── exhibitor.schema.ts           # Schema zod del JSON crudo
│   └── json-exhibitor.repository.ts  # Adaptador que implementa la interface
└── presentation/
    ├── exhibitor-card.tsx
    └── exhibitor-grid.tsx
```

Flujo en `app/(marketing)/expositores/page.tsx`:

```
createExhibitorRepository()          # infrastructure (adaptador)
  └▶ new GetExhibitorsUseCase(repo)  # application
       └▶ useCase.execute()         # devuelve ExhibitorDto[]
            └▶ <ExhibitorGrid />     # presentation
```

La página inyecta el repositorio en el caso de uso (inversión de dependencias): cambiar el mock JSON
por una API real en etapa 2 solo requiere una nueva implementación de `ExhibitorRepository`, sin tocar
`application`, `domain` ni `presentation`.

## Otros módulos

`agenda`, `venue-map`, `news`, `sponsors` y `contact` quedan con las cuatro carpetas vacías
(`.gitkeep`) y un `README.md` que declara su responsabilidad y entidades previstas, apuntando a
`exhibitors` como referencia. Se implementan replicando ese patrón.

## Decisiones transversales

- **Tailwind v4 CSS-first, sin `tailwind.config.ts`**: única fuente de verdad de estilos en
  `design-system/tokens.css`. Ver [`design-system.md`](./design-system.md).
- **next-intl dormido**: `getRequestConfig` fija el locale `es` y carga `messages/es.json`; el layout
  monta `NextIntlClientProvider`. No hay middleware ni segmento `[locale]`. Los textos ya se consumen
  con `useTranslations`/`getTranslations`, así que activar multi-idioma en etapa 2 no toca la UI.
- **Server Components por defecto**: solo `mobile-nav`, `theme-provider`, `theme-toggle`, `reveal` y
  `smooth-scroll-provider` son `"use client"` (estado, efectos, animación o smooth scroll).
- **`shared/`**: código transversal a módulos — `ui` (primitivas shadcn), `components` (header, footer,
  nav, providers), `hooks`, `lib` (`cn`), `config` (fuentes, navegación, íconos morph), `types`.

## Estructura de rutas

`app/(marketing)/` agrupa las páginas públicas bajo el layout raíz (header + footer + providers).
Home (`/`) presenta hero + los tres tiempos + secciones ancladas; cada sección enlaza a su página.
