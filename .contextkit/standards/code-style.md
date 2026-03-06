# Code Style

## Formatting (Prettier)

- **Indent**: 2 spaces
- **Line width**: 80 characters
- **Quotes**: Single quotes (`'`) in JS/TS; double in JSX attributes
- **Semicolons**: Required
- **Trailing commas**: `es5` (objects, arrays, function params)
- **Arrow parens**: Always (`(x) => x`)
- **JSX bracket same line**: false

## TypeScript

- **Strict mode**: All flags enabled (`strict`, `noImplicitAny`, `strictNullChecks`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noImplicitReturns`)
- **Path alias**: `@/*` → `apps/admin/src/*`
- **Types over interfaces**: Prefer `type` for union/intersection; use `interface` for object shapes with extension
- **No `any`**: Always provide explicit types; use `unknown` for truly dynamic data
- **Module resolution**: `bundler` mode with `esModuleInterop`

## Naming Conventions

- **Components**: PascalCase (`LayoutAdmin`, `UserSessionHandler`)
- **UI package components**: `Rt` prefix + PascalCase (`RtBarChart`, `RtDataGrid`, `RtError`)
- **HOCs**: `with` prefix + PascalCase (`withAuth`)
- **Files**: Match the primary export name exactly (`RtBarChart.tsx`, `withAuth.tsx`)
- **Redux slices**: camelCase + `Slice` suffix (`userSlice`, `themeSlice`)
- **Services**: camelCase + `Service` suffix (`productService`)
- **Hooks**: `use` prefix + PascalCase (`useAppSelector`)
- **Types/Interfaces**: PascalCase (`User`, `Product`, `AppDispatch`)

## File Organization

```
ComponentName/
├── ComponentName.tsx      # Implementation
├── ComponentName.test.tsx # Tests (colocated)
└── index.ts               # Re-export
```

For single-file components, `index.ts` is optional; export directly from the file.

## Import Order

1. React / Next.js (framework)
2. Third-party packages (`@mui/...`, `next-auth`, `redux`)
3. Internal workspace packages (`@reacterial/ui`, `@reacterial/auth`)
4. Internal absolute imports (`@/components/...`, `@/redux/...`)
5. Relative imports (`./ComponentName`)
6. Type-only imports last (prefix with `import type`)

## React Patterns

- **Function components only** — no class components
- Use `React.FC<Props>` or inline prop types; never use `React.Component`
- Export named exports from `index.ts` barrel files
- Props destructured in function signature, not inside body
- Conditional rendering: ternary for simple cases, early return for complex guards

## MUI Usage

- Always use MUI `Box`, `Typography`, `Button`, etc. — never raw HTML where an MUI equivalent exists
- Theme colors via `theme.palette.*` — never hardcode hex values in component props
- Use `sx` prop for one-off styles; use `styled()` only for reusable styled components
- Responsive layout via MUI Grid or Box with `sx={{ display: 'flex' }}`

## API Routes (Next.js Pages Router)

- Handle each HTTP method explicitly with `if (req.method === 'GET')` blocks
- Always check auth with `getServerSession` before processing
- Return typed response objects; never return passwords or sensitive fields
- Use `res.status(405).end()` for unsupported methods
- Database connections via the singleton `connectDB()` utility

## Redux

- Define state shape with a TypeScript interface
- Export typed `useAppSelector` and `useAppDispatch` hooks from the store
- Keep slices focused: one domain concern per slice
- Use `createSlice` with `reducers` — no hand-rolled reducers
- Persist only what needs to survive page reload (user, theme)
