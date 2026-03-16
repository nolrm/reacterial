# E2E Smoke Tests

Playwright smoke tests covering the core user journey in the admin app.

## Prerequisites

1. **MongoDB running** with seed data:
   ```bash
   pnpm --filter reacterial-db-init seed
   ```
   This creates the `admin@reacterial.com` / `admin123` test user.

2. **Environment variables** set in `apps/admin/.env.local`:
   ```
   MONGODB_URI=...
   NEXTAUTH_SECRET=...
   NEXTAUTH_URL=http://localhost:3000
   ```

## Running Tests

```bash
# From the monorepo root
pnpm --filter @reacterial/admin e2e

# From apps/admin/
pnpm e2e
```

The test runner will auto-start the dev server if one isn't already running on port 3000.

## Custom Credentials

Override the default seed credentials via environment variables:

```bash
TEST_EMAIL=myuser@example.com TEST_PASSWORD=mypassword pnpm e2e
```

## Test Scenarios

| # | Test | Auth required |
|---|------|---------------|
| 1 | Landing page loads | No |
| 2 | Login redirects to dashboard | No |
| 3 | Dashboard renders after login | Yes |
| 4 | Profile page loads after login | Yes |
| 5 | Unauthenticated `/admin` redirects to `/login` | No |
