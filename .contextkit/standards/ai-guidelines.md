# AI Guidelines

## Core Principles

### Keep It Simple
- Implement code in the fewest lines possible
- Avoid over-engineering solutions
- Choose straightforward approaches over clever ones

### Optimize for Readability
- Prioritize code clarity over micro-optimizations
- Write self-documenting code with clear variable names
- Add comments for "why" not "what" — never for "what"

### DRY (Don't Repeat Yourself)
- Extract repeated business logic to utility functions
- Extract repeated UI markup to reusable components in `@reacterial/ui`
- Don't abstract prematurely — wait for the second repetition

### Choose Libraries Wisely
When adding a dependency, prefer:
- The most popular and actively maintained option
- Libraries already used in the monorepo over new additions
- Zero dependencies over heavy alternatives for small utilities

## Framework Awareness

- This project uses **Next.js Pages Router** — do NOT use App Router patterns (`use client`, `use server`, `layout.tsx` for feature pages, etc.)
- All protected pages live in `pages/admin/` and must use the `withAuth` HOC
- API routes use `pages/api/` — not Route Handlers
- Server-side logic uses `getServerSideProps`, not `async` server components

## Monorepo Awareness

- Always use `--filter` when running pnpm/turbo commands for a specific package
- Package manager is **pnpm** — never use npm or yarn commands
- Shared components belong in `packages/ui/`, not in `apps/admin/`
- New utility hooks belong in `packages/utils/`, not ad-hoc in the app

## TypeScript Strictness

- All strict flags are enabled — generated code must compile without errors under `exactOptionalPropertyTypes` and `noUncheckedIndexedAccess`
- Use `T | undefined` explicitly; never rely on implicit undefined
- Avoid `as` type assertions; prefer proper typing or type guards
- Never use `@ts-ignore` or `@ts-expect-error` without a comment explaining why

## Code Generation Rules

- Follow the `Rt` prefix convention for any new shared UI components
- New Redux slices: use `createSlice`, export actions and typed selector
- New API routes: check auth with `getServerSession` first, handle all HTTP methods explicitly
- New pages: wrap default export with `withAuth` for protected routes
- MUI: always use `sx` prop for styling, not inline `style` or external CSS classes

## File Creation

- Prefer editing existing files over creating new ones
- For new UI components, create the directory structure: `ComponentName/ComponentName.tsx`, `ComponentName/index.ts`
- Always add a colocated test file `ComponentName.test.tsx` for new UI components
- Barrel `index.ts` files should only re-export — no logic

## Database

- MongoDB connection uses a singleton pattern — import `connectDB()` before any Mongoose operations in API routes
- Never expose `password` field in API responses — explicitly exclude it
- Use the User model from `db/models/` — do not create duplicate model definitions

## Security

- Never include passwords, secrets, or tokens in API responses
- Check `getServerSession` on every API route — do not skip auth checks
- Role checks: admin-only operations must verify `session.user.role === 'admin'`
- Validate all user input in API routes before database operations

## Testing

- Always use numbered test descriptions: `it('1. renders...')` — **this is the most commonly forgotten rule**
- Mock `next-auth/react` and `next/router` in component tests
- Do not test MUI internals — test component behavior from the user's perspective
- Check existing patterns before writing new tests — follow the structure in `RtError.test.tsx`

## What NOT to Do

- Do not switch to App Router without explicit instruction
- Do not add new global CSS files — use MUI `sx` or `styled`
- Do not add new state management libraries — use existing Redux slices
- Do not use `fetch` directly in components — use the service layer (`service/`)
- Do not hardcode colors or spacing — use theme values
- Do not create helpers that duplicate lodash or native JS capabilities
- Do not create new `.js` files in `apps/` or `packages/` — TypeScript only
- Do not import from `db/` (root db package) in API routes — use `apps/admin/src/db/config/database.js` for `connectDB()`
- Do not read from `packages/theme` or `packages/utils` and expect implementations — they are currently empty/reserved

## Standards Compliance — Known AI Failure Modes

These are issues that come up repeatedly and must be actively avoided:

| Issue | Priority | Notes |
|-------|----------|-------|
| Skipping numbered test descriptions | HIGH | Apply without being reminded |
| Using App Router patterns in a Pages Router project | HIGH | `use client`, Route Handlers, etc. |
| Creating `.js` files in `apps/` or `packages/` | MEDIUM | TypeScript only |
| Using `as` type assertions instead of proper types | MEDIUM | Use type guards instead |
| Using `fetch` in components instead of service layer | MEDIUM | Always go through `service/` |

## Known Codebase Issues (Do Not Propagate)

When editing existing code, be aware of these known issues. Do not replicate them in new code:

- `RtDataGrid` has `items: any[]` — existing components can stay as-is, but new ones must be typed
- `database.js` is JavaScript — leave it as JS unless explicitly asked to migrate
- `LoginForm` uses manual `event.currentTarget` form extraction — do not add more forms this way; wait for react-hook-form adoption
- Inline `style={{}}` on container divs in `RtDataGrid` — use `Box` with `sx` in new components

## Package Status

- `@reacterial/theme` — reserved/empty. Do not add code here unless instructed.
- `@reacterial/utils` — reserved/empty. Add shared hooks/helpers here when instructed.
- `db/` root package — only for seeds/init scripts. Not linked to the admin app at runtime.

## Form Handling

No form library is currently installed. Until `react-hook-form` or similar is added:
- Use controlled components with `useState` for simple forms
- Use `event.currentTarget` extraction pattern (already in LoginForm) for uncontrolled forms
- Validate in the API route, not the form component
