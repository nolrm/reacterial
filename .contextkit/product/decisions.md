# Technical Decisions

## Architecture Decisions

### Next.js Pages Router over App Router (2024)

**Decision:** Use Pages Router (`pages/`) for the admin app, not App Router.

**Rationale:**
- Simpler mental model for page-level auth via `withAuth` HOC
- `getServerSideProps` provides straightforward server-side redirect on login page
- App Router adds complexity (server components, `use client` boundaries) without clear benefit for an admin dashboard
- Pages Router is stable and well-supported in Next.js 16

**Alternatives Considered:** App Router with `middleware.ts` for auth

**Status:** Implemented

---

### Turborepo for Monorepo Orchestration

**Decision:** Use Turborepo to orchestrate builds, linting, and tests across packages.

**Rationale:**
- Task-level caching avoids redundant rebuilds
- Dependency-aware task ordering (build packages before admin app)
- Simple `turbo.json` config with minimal overhead
- Strong pnpm integration

**Alternatives Considered:** Nx, Lerna, manual scripts

**Status:** Implemented

---

### `transpilePackages` Instead of Package Builds

**Decision:** Workspace packages (`@reacterial/ui`, etc.) are transpiled by Next.js directly. No `tsc` build step in packages.

**Rationale:**
- Packages point `main` to `./src/index.ts` (source directly)
- Next.js handles compilation via `transpilePackages` in `next.config.mjs`
- Eliminates need for watch builds during development
- Simplifies CI (no package build step before admin build)

**Alternatives Considered:** Building each package to `dist/` with `tsc`

**Status:** Implemented

---

### Redux Toolkit + Redux Persist

**Decision:** Use Redux Toolkit for global state with Redux Persist for localStorage persistence.

**Rationale:**
- User session data (from NextAuth) needs to be available synchronously before the session hook resolves
- Theme preference should survive page reload without flash
- RTK provides standardized slice/action patterns

**Alternatives Considered:** Zustand, React Context, SWR cache only

**Status:** Implemented

---

### NextAuth v4 with Credentials + Google OAuth

**Decision:** Use NextAuth v4 with dual providers.

**Rationale:**
- Credentials for demo/development with email+password
- Google OAuth for production-ready social login
- `findOrCreateUser` pattern handles first-time OAuth users
- Role-based access (user/admin) baked into session via JWT callbacks

**Status:** Implemented

---

## Future Decisions to Make

### App Router Migration

**Decision:** Evaluate migrating admin app to App Router.

**Options:**
- Keep Pages Router (stable, no migration cost)
- Migrate incrementally (coexist via `app/` directory)
- Full migration to App Router

**Factors:** Team familiarity, RSC benefits for data fetching, middleware-based auth
