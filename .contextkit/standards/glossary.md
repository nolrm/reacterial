# Project Glossary

> Terminology that provides additional context to AI

## Documentation Levels

### Standard Levels
**Architecture Level** - System-wide documentation covering how the whole product or platform is structured and how parts communicate. Lives in `docs/architecture.md` (or equivalent root-level docs folder). Answers: "How does this system fit together?"
**Page / Feature Level** - Documentation for a full screen, route, or major feature area. Covers purpose, layout, components used, data/state, and key user flows. Answers: "What does this page/feature do and how do its parts work together?"
**Component Level** - Documentation for a single UI component or tight group of components. Covers props/API, usage, behavior, and edge cases. Answers: "What is this component and how do I use it?"

---

## Business Terms

### Users & Auth
**User** - The primary entity stored in MongoDB. Fields: id, name, email, password (bcrypt hashed), role, image, phone, address, createdAt.
**Role** - Enum on User: `'user' | 'admin'`. Admins can register new users, manage all users, and change roles.
**Session** - NextAuth JWT session. maxAge 30 minutes. Augmented with custom fields (id, role, phone, address) via jwt/session callbacks.
**Credentials Provider** - NextAuth email+password login using `bcrypt.compare` against MongoDB.
**Google OAuth** - NextAuth social login. Uses `findOrCreateUser` to upsert the user in MongoDB on first sign-in.
**withAuth HOC** - HOC in `@reacterial/auth` that wraps protected pages. Redirects to `/login` if unauthenticated using `useSession`.
**UserSessionHandler** - A render-null component (`apps/admin/src/components/UserSessionHandler.tsx`) that syncs the NextAuth session into the Redux store on every status change.

### Components
**Rt prefix** - Naming prefix for all shared UI components in `@reacterial/ui` (e.g. `RtBarChart`, `RtDataGrid`, `RtError`). Indicates a project-specific MUI wrapper.
**RtDataGrid** - Wrapper around MUI X DataGrid with built-in loading spinner and empty-state rendering.
**RtTopSummary** - Summary card component (used on dashboard).
**RtError** - MUI Alert wrapper that renders nothing when `message` is null. The only fully tested component.
**PageTitle** - Shared heading component for admin pages.
**MainContent** - Layout wrapper for the main scrollable area inside LayoutAdmin.
**LayoutAdmin** - The shell layout for all protected admin pages: sidebar + header + main content area. Located at `apps/admin/src/layouts/LayoutAdmin.tsx`.

### Admin Pages
**Dashboard** - `pages/admin/index.tsx`. Summary stats + charts.
**Products** - `pages/admin/products.tsx`. Fetches from dummyjson.com via `productService`.
**Profile** - `pages/admin/profile.tsx`. Logged-in user's profile.
**Settings** - `pages/admin/settings.tsx`. App/user settings.
**Charts** - `pages/admin/charts.tsx`. Chart showcases.
**Invoice** - `pages/admin/invoice.tsx`. Invoice display.

### Data & Services
**Product** - Demo entity from the external dummyjson.com API. Fields: id, title, description, price, category, sku. Not stored in MongoDB.
**productService** - Service in `apps/admin/src/service/productService.ts` that calls dummyjson.com. Should be replaced for real projects.
**connectDB** - Mongoose singleton at `apps/admin/src/db/config/database.js`. Call `await connectDB()` at the top of every API route handler.

### Redux
**userSlice** - Redux slice for the current logged-in user's profile data (id, name, email, image, phone, address). Persisted to localStorage.
**themeSlice** - Redux slice for light/dark mode. Defined inline in `store.ts`. Persisted to localStorage.
**UserState** - TypeScript type exported from `userSlice.ts` describing the shape of user state.

### Infrastructure
**Turborepo** - Build orchestration tool. Run tasks with `pnpm <task>` (root) or `turbo run <task> --filter=<package>`.
**transpilePackages** - Next.js config option that compiles workspace packages from source (no separate build step needed for packages during dev).
**ContextKit** - AI development standards tooling. Standards live in `.contextkit/standards/`. Hooks live in `.contextkit/hooks/`.

---

## How to Use

In Claude Code: Use terms naturally — e.g. `"Add a new Rt-prefixed component"`, `"Create a new admin page"`, `"Add a Redux slice for notifications"`

---

## Keep Updated

Edit this file when new domain entities, features, or conventions are added.

Run `/analyze` to refresh auto-detected terms.
