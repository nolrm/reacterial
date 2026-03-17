# Workflows

## Development

```bash
pnpm dev          # Start admin app on port 3000
pnpm dev:all      # Start all packages in parallel
```

Hot reload is enabled. Workspace packages are transpiled live — no rebuild needed when editing `packages/`.

## Before Committing

Git hooks run automatically via ContextKit hooks (`.contextkit/hooks/`):

**Pre-push**:

- `pnpm run format` — auto-formats all files; if any files change, push is blocked (commit the reformatted files)
- `pnpm run lint` — lints the entire codebase
- `pnpm --filter @reacterial/admin test:ci` — runs unit tests in CI mode

If hooks fail, fix the issue before re-committing. Never use `--no-verify`.

## Adding a New Page

Existing admin pages: `index` (dashboard), `products`, `profile`, `settings`, `charts`, `invoice`.

1. Create `apps/admin/src/pages/admin/page-name.tsx`
2. Wrap the default export with `withAuth`:
   ```tsx
   export default withAuth(PageName);
   ```
3. Use `LayoutAdmin` for the page shell:
   ```tsx
   return (
     <LayoutAdmin>
       <PageTitle title="Page Name" />
       <MainContent>...</MainContent>
     </LayoutAdmin>
   );
   ```
4. Add navigation link in `apps/admin/src/components/layout/Sidebar` component

## Adding a New Shared Component

1. Create `packages/ui/src/<category>/ComponentName/ComponentName.tsx`
2. Create `packages/ui/src/<category>/ComponentName/ComponentName.test.tsx`
3. Create `packages/ui/src/<category>/ComponentName/index.ts` re-export
4. Add to `packages/ui/src/<category>/index.ts` barrel
5. Name with plain PascalCase — no prefix required

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
pnpm --filter @reacterial/admin jest ErrorMessage           # Single file
```

## Running E2E Smoke Tests

Requires MongoDB running with seed data (`pnpm --filter reacterial-db-init seed`) and `.env.local` configured.

```bash
pnpm --filter @reacterial/admin e2e       # Run all Playwright smoke tests
```

The runner auto-starts the dev server if one isn't already running on port 3000. Tests live in `apps/admin/e2e/smoke.spec.ts`. See `apps/admin/e2e/README.md` for full setup.

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

## AI Collaboration Workflow

For non-trivial tasks, follow this flow:

1. **Context Analysis** — understand the requirement; read relevant existing files before writing any code
2. **Approach Planning** — outline the implementation strategy; identify which packages/files are affected
3. **Confirm** — align on the approach before executing, especially for changes that touch multiple files
4. **Execution** — implement following the project standards
5. **Quality Check** — verify TypeScript compiles, tests pass, no lint errors

### After Implementation

- Review the generated code against standards
- Run `pnpm type-check` if TypeScript changes were made
- Run the relevant test file before pushing
