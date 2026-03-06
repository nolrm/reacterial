# Workflows

## Development

```bash
pnpm dev          # Start admin app on port 3000
pnpm dev:all      # Start all packages in parallel
```

Hot reload is enabled. Workspace packages are transpiled live — no rebuild needed when editing `packages/`.

## Before Committing

Git hooks run automatically via Husky:

**Pre-commit** (lint-staged):
- Prettier write on `*.{js,jsx,ts,tsx,json,css,scss,md}`
- ESLint fix on `*.{js,jsx,ts,tsx}`

**Pre-push**:
- `pnpm run format:check` — fails if formatting is off
- `turbo run lint test:ci --filter=@reacterial/admin`

If hooks fail, fix the issue before re-committing. Never use `--no-verify`.

## Adding a New Page

1. Create `apps/admin/src/pages/admin/page-name.tsx`
2. Wrap the default export with `withAuth`:
   ```tsx
   export default withAuth(PageName);
   ```
3. Use `LayoutAdmin` for the page shell
4. Add navigation link in the Sidebar component

## Adding a New Shared Component

1. Create `packages/ui/src/<category>/ComponentName/ComponentName.tsx`
2. Create `packages/ui/src/<category>/ComponentName/ComponentName.test.tsx`
3. Create `packages/ui/src/<category>/ComponentName/index.ts` re-export
4. Add to `packages/ui/src/<category>/index.ts` barrel
5. Prefix with `Rt` if it's a data/chart/display component

## Adding a New API Route

1. Create `apps/admin/src/pages/api/<resource>/[id].ts` or `index.ts`
2. Call `await connectDB()` at the top of each handler
3. Call `getServerSession(req, res, authOptions)` and check for session
4. Handle each method with explicit `if (req.method === 'X')` branches
5. Return `405` for unhandled methods

## Adding a New Redux Slice

1. Create `apps/admin/src/redux/<domain>Slice.ts`
2. Define state interface, initial state, and `createSlice`
3. Export actions and a typed selector
4. Add reducer to `store.ts` `reducer` object
5. Add to `persistConfig.whitelist` if persistence is needed

## Running Tests

```bash
pnpm test                                              # Watch mode (all)
pnpm test:ci                                           # CI (no watch)
pnpm --filter @reacterial/admin jest RtError           # Single file
```

## Type Checking

```bash
pnpm type-check   # Run across all packages via Turborepo
```

## Linting

```bash
pnpm lint         # Check all packages
pnpm lint:fix     # Auto-fix
```

## Database Operations

```bash
cd db
pnpm --filter reacterial-db-init seed    # Seed sample data
pnpm --filter reacterial-db-init reset   # Full reset
```

Requires `MONGODB_URI` set in `apps/admin/.env.local`.

## Environment Setup

Copy and fill `apps/admin/.env.local`:

```
MONGODB_URI=mongodb+srv://...
NEXTAUTH_SECRET=<random string>
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=     # optional
GOOGLE_CLIENT_SECRET= # optional
```

## Build & Deployment

```bash
pnpm build          # Production build (all packages, Turborepo)
pnpm build:admin    # Admin app only
```

Turborepo caches build outputs. Use `pnpm clean` to clear caches if builds behave unexpectedly.
