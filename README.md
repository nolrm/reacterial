# Reacterial

Reacterial is a **multi-purpose development platform** designed for four core use cases:

1. **🤖 AI-Native Admin Starter** - Batteries-included admin dashboard with AI integration patterns
2. **📚 Modern Monorepo Learning Platform** - Reference implementation for pnpm workspaces, Turborepo, and Next.js 15
3. **⚡ Internal Tools Accelerator** - Clone, configure, and ship internal dashboards in days
4. **🎨 Component Design System** - Living Storybook for `@reacterial/ui` — explore and develop components without running the full app

Built with Next.js, React, Material-UI (MUI), Redux, and a scalable monorepo architecture.

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
- **pnpm Workspaces** - Monorepo management
- **Turborepo** - Smart caching & build orchestration

## 🎯 Project Goals & Status

### Goal 1: AI-Native Admin Starter 🤖

**Status**: 📋 Planned  
**Vision**: Complete admin starter with AI integration patterns (LLM-powered insights, natural language queries, automated summaries)

**Current State**:

- ✅ Admin dashboard foundation
- ✅ Data visualization (charts, grids)
- ✅ Authentication & authorization
- 📋 AI integration examples (planned)
- 📋 LLM provider abstraction layer (planned)

### Goal 2: Modern Monorepo Learning Platform 📚

**Status**: ✅ Implemented  
**Vision**: Production-ready reference for teams learning modern monorepo patterns

**Current State**:

- ✅ pnpm workspaces setup
- ✅ Turborepo integration
- ✅ Shared packages (`@reacterial/ui`, `@reacterial/auth`, `@reacterial/theme`)
- ✅ Comprehensive documentation
- 📋 Interactive tutorials (planned)
- 📋 Video walkthroughs (planned)

### Goal 3: Internal Tools Accelerator ⚡

**Status**: 🚧 In Progress  
**Vision**: Clone this repo, wire your data models, and have a working internal tool in a weekend

**Current State**:

- ✅ Monorepo structure
- ✅ Shared UI components
- ✅ Database models & scripts
- ✅ Authentication system
- 🚧 CRUD scaffolding generator (in progress)
- 📋 One-command setup script (planned)

### Goal 4: Component Design System 🎨

**Status**: 📋 Planned
**Vision**: A living Storybook for `@reacterial/ui` — browse, develop, and test components without spinning up the full app (no MongoDB, no auth required)

**Current State**:

- ✅ Shared UI library (`@reacterial/ui`) with 9 components
- ✅ Components decoupled from app-specific concerns (Redux, NextAuth)
- 📋 Storybook setup in `packages/ui/` (planned)
- 📋 Stories for all components with autodocs (planned)
- 📋 Light/dark mode toggle in Storybook toolbar (planned)

See [Storybook & Design System Plan](./docs/STORYBOOK_DESIGN_SYSTEM.md) for the full implementation plan.

See [Roadmap](./docs/ROADMAP.md) for detailed development phases and timeline.

## Local development

### Step 1: Install Dependencies

```bash
pnpm install
```

### Step 2: Set Up Environment Variables

Create `apps/admin/.env.local` file with your credentials:

```bash
# Copy the example file
cp apps/admin/.env.local.example apps/admin/.env.local

# Edit with your MongoDB URI and secrets
nano apps/admin/.env.local
```

**Required variables:**

- `MONGODB_URI` - Your MongoDB connection string
- `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
- `NEXTAUTH_URL` - http://localhost:3000 (for local dev)

See [Environment Setup Guide](./docs/ENVIRONMENT_SETUP.md) for detailed instructions.

### Step 3: Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Default Credentials

- **Email**: `admin@reacterial.com`
- **Password**: `admin123`

## Database

```bash
1. cd db
2. pnpm install
3. pnpm run reset
```

### Using NPM (Legacy)

If you prefer npm, you can still use it:

```bash
1. npm install
2. npm run dev
```

## ⚡ Turborepo Features

This project leverages **Turborepo** for lightning-fast builds:

- ✅ **Smart Caching** - Never rebuild the same code twice (141x faster on cache hits!)
- ✅ **Parallel Execution** - Run tasks across packages simultaneously
- ✅ **Dependency-Aware** - Automatically builds packages in the correct order
- ✅ **Remote Caching** - Share build cache with your team (optional)

**Example Performance:**

```bash
First build:  17.3s
Cached build: 123ms  ⚡ >>> FULL TURBO
```

## 📚 Documentation

Comprehensive documentation is available in the [`docs/`](./docs) directory:

### Roadmap & Vision

- **🗺️ [Roadmap](./docs/ROADMAP.md)** - Planned features and development phases across all three goals

### Getting Started

- **🎉 [Monorepo Implementation](./docs/MONOREPO_IMPLEMENTATION.md)** - Complete migration guide and new structure
- **🔧 [Environment Setup](./docs/ENVIRONMENT_SETUP.md)** - Configure MongoDB and environment variables
- **⭐ [Decision Matrix](./docs/DECISION_MATRIX.md)** - Choose the right architecture for your needs

### Architecture & Best Practices

- **[Monorepo Architecture](./docs/MONOREPO_ARCHITECTURE.md)** - Build multiple apps with shared components
- **[Component Organization Guide](./docs/COMPONENT_ORGANIZATION_GUIDE.md)** - UI component structure and best practices
- **[TypeScript Strict Config](./docs/TYPESCRIPT_STRICT_CONFIG.md)** - Strict type checking setup

### Development & Deployment

- **⚡ [Turborepo Setup](./docs/TURBOREPO_SETUP.md)** - Smart caching & performance optimization
- **🔒 [Git Hooks](./docs/GIT_HOOKS.md)** - Code quality enforcement with ContextKit hooks
- **🚀 [Vercel Deployment](./docs/VERCEL_DEPLOYMENT.md)** - Deploy to Vercel (production guide)
- **[PNPM Migration Summary](./docs/MIGRATION_SUMMARY.md)** - NPM to PNPM conversion details

### Reference

- **[Documentation Index](./docs/README.md)** - Full documentation overview

## 🧪 Testing

```bash
# Run unit tests in watch mode
pnpm test

# Run unit tests in CI mode
pnpm test:ci
```

### E2E Smoke Tests (Playwright)

Requires MongoDB running with seed data and `.env.local` configured.

```bash
# Seed the database first (once)
pnpm --filter reacterial-db-init seed

# Run Playwright smoke tests (auto-starts dev server if needed)
pnpm --filter @reacterial/admin e2e
```

Covers: landing page, login flow, dashboard, profile page, and auth guard redirect. See [`apps/admin/e2e/README.md`](./apps/admin/e2e/README.md) for full setup.

## 📦 Building

```bash
# Format, lint, and build for production
pnpm build

# Start production server
pnpm start
```
