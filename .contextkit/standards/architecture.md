# Architecture

## Component Creation Priority

When building UI, follow this order — don't skip ahead:

1. **Check `@reacterial/ui` first** — does an `Rt`-prefixed component already exist that fits?
2. **Create in `@reacterial/ui`** — if the component is reusable across pages, it belongs in the shared library with the `Rt` prefix
3. **Create in `apps/admin/src/components/`** — if it's specific to one page or feature
4. **Use MUI directly** — only for truly one-off, non-reusable layouts

## Documentation Levels

All documentation follows a 3-level hierarchy. Each level answers a different question.

| Level | Scope | Question it answers |
|-------|-------|---------------------|
| **Architecture** | System / platform | How things are connected and communicate |
| **Page / Feature** | App / route / feature | Containers and complex features |
| **Component** | Single component | One component and its own docs |

## Project Architecture

### Overview

Reacterial is a pnpm monorepo using Turborepo for orchestration. It is an AI-native admin starter and internal tools accelerator.

```
reacterial-monorepo/
├── apps/
│   └── admin/               # @reacterial/admin — Next.js 16 (Pages Router)
├── packages/
│   ├── ui/                  # @reacterial/ui — Shared MUI component library
│   ├── auth/                # @reacterial/auth — Auth utilities
│   ├── theme/               # @reacterial/theme — Theme config (reserved)
│   └── utils/               # @reacterial/utils — Shared hooks & helpers
├── db/                      # reacterial-db-init — MongoDB models & seeds
├── turbo.json               # Turborepo task graph
├── pnpm-workspace.yaml      # pnpm workspace config
└── eslint.config.mjs        # ESLint 9 flat config (root)
```

### Package Dependency Graph

```
@reacterial/admin
├── @reacterial/ui       (transpiled via transpilePackages)
├── @reacterial/auth     (transpiled via transpilePackages)
├── @reacterial/theme    (transpiled via transpilePackages)
└── @reacterial/utils    (transpiled via transpilePackages)
```

All workspace packages are linked via `workspace:*` protocol and transpiled by Next.js — no build step required for packages during development.

### Admin App Structure (`apps/admin/src/`)

```
pages/               # Next.js Pages Router (NOT App Router)
├── _app.tsx         # Root: Redux + Persist + NextAuth + Theme
├── index.tsx        # Landing page (public)
├── login.tsx        # Login (public, GSSP auth redirect)
├── admin/           # Protected pages (wrapped with withAuth)
│   ├── index.tsx    # Dashboard (summary stats + charts)
│   ├── products.tsx # Products list (dummyjson.com via productService)
│   ├── profile.tsx  # Current user profile
│   ├── settings.tsx # App/user settings
│   ├── charts.tsx   # Chart showcases
│   └── invoice.tsx  # Invoice display
└── api/             # API routes
    ├── auth/[...nextauth].ts
    └── users/
        ├── index.ts    # List / create users
        ├── [id].ts     # GET / PUT / DELETE by ID
        └── register.ts # Admin-only registration

components/
├── landing/         # Landing page sections
├── layout/          # Header, Sidebar, RtProfileDropdown
├── ThemeProvider.tsx
└── UserSessionHandler.tsx  # Syncs NextAuth session → Redux store (no UI)

layouts/
└── LayoutAdmin.tsx  # Sidebar + header shell for all admin pages

redux/
├── store.ts         # configureStore + Redux Persist + themeSlice (inline)
└── userSlice.ts     # User state (persisted)

service/
└── productService.ts  # External API calls (dummyjson.com) — demo only

db/config/
└── database.js      # Mongoose singleton (JavaScript, not TypeScript — tech debt)

types/               # Shared TypeScript types (theme.d.ts, next-auth.d.ts)
styles/              # Global SCSS
```

**Note on DB connection location**: `connectDB()` is defined in `apps/admin/src/db/config/database.js`. This file is plain JavaScript. The root `db/` package contains a separate Mongoose connection + seed scripts used only for initial data setup. Do not confuse the two.

### Authentication Flow

```
Browser → /login → GSSP: if session → redirect /admin
                       → if no session → render LoginForm
LoginForm → NextAuth signIn('credentials') → POST /api/auth/[...nextauth]
         → Google OAuth → findOrCreateUser → JWT callback → session callback
All /admin/* pages → withAuth HOC → useSession → redirect if unauthenticated
```

### Data Flow

```
External API (dummyjson.com) → productService.ts → page component → RtDataGrid
MongoDB ← Mongoose models ← API routes ← axios from page components
Redux store ← UserSessionHandler ← NextAuth session ← _app.tsx
```

### State Management

| State | Location | Persistence |
|-------|----------|-------------|
| Current user | Redux `userSlice` | localStorage (redux-persist) |
| Theme mode | Redux `themeSlice` | localStorage (redux-persist) |
| Server data | Local component state | None (re-fetched) |
| Auth session | NextAuth session | Cookie/JWT (30 min) |

### UI Package Architecture

Components exported from `@reacterial/ui`:

| Category | Components |
|----------|------------|
| Charts | `RtBarChart`, `RtLineChart`, `RtPieChart` |
| Data Display | `RtDataGrid`, `RtTopSummary` |
| Layout | `MainContent` |
| UI Primitives | `PageTitle`, `RtError` |

All `Rt`-prefixed components wrap MUI components with project-specific defaults.

### Routing Convention

- **Pages Router only** — `app/` directory exists only for root layout and favicon
- Protected routes live under `pages/admin/`
- All protected pages export `withAuth(Component)` as default
- `getServerSideProps` used for login page redirect only

### Build & Orchestration

Turborepo task dependencies:
- `build` → depends on upstream package builds
- `lint`, `test`, `type-check` → independent, cached per package
- `dev` → persistent, not cached
- Global env dependency: `**/.env.*local`
