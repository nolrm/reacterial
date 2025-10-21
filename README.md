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

## 📚 Documentation

Comprehensive documentation is available in the [`docs/`](./docs) directory:

- **🎉 [Monorepo Implementation](./docs/MONOREPO_IMPLEMENTATION.md)** - Complete migration guide and new structure
- **🔒 [Git Hooks](./docs/GIT_HOOKS.md)** - Code quality enforcement with Husky
- **🚀 [Vercel Deployment](./docs/VERCEL_DEPLOYMENT.md)** - Deploy to Vercel (production guide)
- **🔧 [Environment Setup](./docs/ENVIRONMENT_SETUP.md)** - Configure MongoDB and environment variables
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
