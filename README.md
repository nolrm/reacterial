# Reacterial

Reacterial is a versatile boilerplate for building modern web applications like CRM systems, admin dashboards, and enterprise portals. Built with Next.js, React, Material-UI (MUI), and Redux for scalable state management.


## Deployed on Vercel
https://www.reacterial.com/

## Stacks
- Next.js
- React
- MUI
- Vercel
- TypeScript
- Redux
- Auth (NextAuth and Google API Oauth)
- Jest: Unit Test
- MongoDB Atlas

### TODO
- Storybook
- Playwright: UI Automated test
- Presentable landing page
- Theming: Light/Dark theme in UI

## Local development

First, run the development server:

```bash
1. pnpm install
2. pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database

```bash
1. cd src/db
2. pnpm install
3. pnpm run reset
```

### Using NPM (Legacy)
If you prefer npm, you can still use it:
```bash
1. npm install
2. npm run dev
```

## 📚 Documentation

Comprehensive documentation is available in the [`docs/`](./docs) directory:

- **🎉 [Monorepo Implementation](./docs/MONOREPO_IMPLEMENTATION.md)** - Complete migration guide and new structure
- **⭐ [Decision Matrix](./docs/DECISION_MATRIX.md)** - Choose the right architecture for your needs
- **[Monorepo Architecture](./docs/MONOREPO_ARCHITECTURE.md)** - Build multiple apps with shared components
- **[Component Organization Guide](./docs/COMPONENT_ORGANIZATION_GUIDE.md)** - UI component structure and best practices
- **[PNPM Migration Summary](./docs/MIGRATION_SUMMARY.md)** - NPM to PNPM conversion details
- **[Documentation Index](./docs/README.md)** - Full documentation overview

## 🧪 Testing

```bash
# Run tests in watch mode
pnpm test

# Run tests in CI mode
pnpm test:ci
```

## 📦 Building

```bash
# Format, lint, and build for production
pnpm build

# Start production server
pnpm start
```