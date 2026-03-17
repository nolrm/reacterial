# Product Roadmap

## Current Phase: Foundation (v0.2.0)

### Completed Features

- **Monorepo structure:** pnpm workspaces + Turborepo with 4 packages + admin app
- **Authentication:** NextAuth v4 with Credentials + Google OAuth, role-based (user/admin)
- **User management:** CRUD API routes, admin-only registration, role management
- **Data visualization:** BarChart, LineChart, PieChart (MUI X Charts wrappers)
- **Data grid:** DataGrid with search/filter support (MUI X DataGrid wrapper)
- **Theme system:** Light/dark mode toggle persisted in Redux
- **Redux store:** userSlice + themeSlice with Redux Persist
- **Shared UI library:** @reacterial/ui (`BarChart`, `LineChart`, `PieChart`, `DataGrid`, `TopSummary`, `ErrorMessage`, `ProfileDropdown`, `PageTitle`, `MainContent`)
- **ESLint 9:** Flat config with TypeScript strict rules
- **Git hooks:** ContextKit hooks — pre-push (format + lint + test) + commit-msg (conventional format)
- **ContextKit:** AI development standards installed

### In Progress

- **Test coverage:** Expanding test suite beyond ErrorMessage component
- **Documentation:** ContextKit standards being populated

### Upcoming Features

- **More admin pages:** Expanded user management UI, settings page
- **Form validation:** Zod or react-hook-form integration
- **API error handling:** Standardized error response format
- **Loading states:** Skeleton components for data-heavy pages
- **Notifications:** Toast/snackbar system via MUI Snackbar

## Technical Debt & Improvements

### High Priority

- **Test coverage:** Most components lack tests — only ErrorMessage has coverage
- **Type safety in db/:** Root `db/` package uses JavaScript — migrate to TypeScript

### Medium Priority

- **productService:** External API (dummyjson.com) is a demo — replace with real API or mock
- **Error boundaries:** No React error boundaries in place for admin pages
- **Accessibility:** MUI components need aria-label audit

### Low Priority

- **Storybook:** No component playground — Storybook would help document @reacterial/ui
- **E2E tests:** ~~No Playwright/Cypress tests yet~~ Playwright smoke tests added (`apps/admin/e2e/smoke.spec.ts`) — 5 scenarios covering login, dashboard, profile, and auth guard

## Success Metrics

### Code Quality

- **TypeScript Coverage:** 100% for new code in apps/ and packages/
- **Linting Errors:** Zero in CI
- **Test Coverage:** Target 70%+ for packages/ui and packages/auth

### Performance

- **Page Load Time:** < 2 seconds (LCP) for dashboard
- **Build Time:** < 3 minutes via Turborepo cache

## Future Vision

### Q3 2025: Production-Ready Platform

- Full test coverage across all packages
- Storybook for @reacterial/ui component documentation
- ✅ E2E smoke tests with Playwright (done — expand coverage + add CI/CD integration)
- Deployment guide (Vercel + MongoDB Atlas)

### Q4 2025: AI Features

- AI-powered data insights on dashboard
- Natural language search for data grids
- Claude API integration for admin assistant
