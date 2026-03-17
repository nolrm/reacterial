# Monorepo Architecture for Reacterial

## 🎯 Vision: Multiple Apps with Shared Components

This document outlines the recommended monorepo structure for Reacterial to support multiple applications sharing common components and utilities.

---

## 📦 Recommended Structure

```
reacterial/
├── apps/                           # 🚀 All applications
│   ├── admin/                      # Current admin dashboard
│   │   ├── package.json
│   │   ├── next.config.mjs
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── pages/
│   │       ├── layouts/
│   │       └── app/
│   │
│   ├── customer-portal/            # Future: Customer-facing app
│   │   ├── package.json
│   │   └── src/
│   │
│   └── mobile-app/                 # Future: Mobile companion
│       ├── package.json
│       └── src/
│
├── packages/                       # 📚 Shared packages
│   ├── ui/                         # Reusable UI components
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── charts/             # BarChart, LineChart, PieChart
│   │       ├── data-display/       # DataGrid, TopSummary
│   │       ├── layout/             # Header, Sidebar, etc.
│   │       ├── ui/                 # PageTitle, ErrorMessage
│   │       └── index.ts            # Barrel exports
│   │
│   ├── auth/                       # Authentication package
│   │   ├── package.json
│   │   └── src/
│   │       ├── components/         # LoginForm, withAuth
│   │       ├── hooks/              # useAuth, useSession
│   │       └── utils/              # Auth helpers
│   │
│   ├── config/                     # Shared configuration
│   │   ├── package.json
│   │   └── src/
│   │       ├── eslint/             # Shared ESLint config
│   │       ├── typescript/         # Shared tsconfig
│   │       └── prettier/           # Shared Prettier config
│   │
│   ├── theme/                      # Theme package
│   │   ├── package.json
│   │   └── src/
│   │       ├── ThemeProvider.tsx
│   │       ├── themes/             # light.ts, dark.ts
│   │       └── index.ts
│   │
│   └── utils/                      # Shared utilities
│       ├── package.json
│       └── src/
│           ├── api/                # API helpers
│           ├── hooks/              # Common hooks
│           └── helpers/            # Helper functions
│
├── db/                             # Database (shared)
│   ├── package.json
│   ├── models/
│   └── scripts/
│
├── docs/                           # Documentation
│   └── ...
│
├── pnpm-workspace.yaml             # Workspace configuration
├── package.json                    # Root package.json
├── tsconfig.json                   # Base TypeScript config
└── .npmrc                          # pnpm configuration
```

---

## 🔧 Implementation Plan

### Phase 1: Restructure Current Project

**Move current app to `apps/admin/`**
```bash
apps/admin/
├── package.json              # Moved from root
├── next.config.mjs
├── tsconfig.json
├── jest.config.js
└── src/
    ├── pages/
    ├── layouts/
    └── app/
```

### Phase 2: Extract Shared UI Components

**Create `packages/ui/`** with all RT components:
```typescript
// packages/ui/src/index.ts
export * from './charts';
export * from './data-display';
export * from './layout';
export * from './ui';
```

**Usage in apps:**
```typescript
// apps/admin/src/pages/admin/index.tsx
import { BarChart, PieChart } from '@reacterial/ui';
import { PageTitle } from '@reacterial/ui';
```

### Phase 3: Extract Other Shared Code

- **`@reacterial/auth`** - Authentication components & logic
- **`@reacterial/theme`** - Theme provider & configurations
- **`@reacterial/config`** - Shared configs (ESLint, TypeScript, Prettier)
- **`@reacterial/utils`** - Common utilities & hooks

---

## 📋 Updated pnpm-workspace.yaml

```yaml
packages:
  # Applications
  - 'apps/*'
  
  # Shared packages
  - 'packages/*'
  
  # Database
  - 'db'
```

---

## 📦 Package.json Examples

### Root package.json
```json
{
  "name": "reacterial-monorepo",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "pnpm --filter @reacterial/admin dev",
    "dev:all": "pnpm --parallel dev",
    "build": "pnpm --recursive build",
    "build:admin": "pnpm --filter @reacterial/admin build",
    "lint": "pnpm --recursive lint",
    "test": "pnpm --recursive test",
    "clean": "pnpm --recursive exec rm -rf node_modules .next dist"
  },
  "devDependencies": {
    "@types/node": "^20",
    "prettier": "^3.6.2",
    "typescript": "^5.4.5"
  }
}
```

### apps/admin/package.json
```json
{
  "name": "@reacterial/admin",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest"
  },
  "dependencies": {
    "@reacterial/ui": "workspace:*",
    "@reacterial/auth": "workspace:*",
    "@reacterial/theme": "workspace:*",
    "@reacterial/utils": "workspace:*",
    "next": "^14.2.4",
    "react": "^18",
    "react-dom": "^18"
  }
}
```

### packages/ui/package.json
```json
{
  "name": "@reacterial/ui",
  "version": "0.1.0",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./charts": "./src/charts/index.ts",
    "./data-display": "./src/data-display/index.ts",
    "./layout": "./src/layout/index.ts",
    "./ui": "./src/ui/index.ts"
  },
  "scripts": {
    "lint": "eslint src/",
    "test": "jest",
    "type-check": "tsc --noEmit"
  },
  "peerDependencies": {
    "@mui/material": "^5.15.19",
    "@mui/x-charts": "^7.13.0",
    "@mui/x-data-grid": "^7.17.0",
    "react": "^18",
    "react-dom": "^18"
  },
  "devDependencies": {
    "@types/react": "^18.3.11",
    "typescript": "^5.4.5"
  }
}
```

### packages/auth/package.json
```json
{
  "name": "@reacterial/auth",
  "version": "0.1.0",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "peerDependencies": {
    "next-auth": "^4.24.11",
    "react": "^18"
  }
}
```

---

## 🚀 Benefits of This Approach

### 1. **Code Reusability**
- ✅ Share components across multiple apps
- ✅ DRY principle - single source of truth
- ✅ Consistent UI/UX across all applications

### 2. **Independent Development**
- ✅ Teams can work on different apps independently
- ✅ Separate deployment pipelines per app
- ✅ Version control at package level

### 3. **PNPM Workspace Features**
- ✅ **workspace:\*** protocol - automatic local linking
- ✅ Shared `node_modules` - saves disk space
- ✅ Fast installs with hard links
- ✅ `--filter` flag for targeted commands

### 4. **Scalability**
- ✅ Easy to add new apps: `apps/new-app/`
- ✅ Easy to add new packages: `packages/new-package/`
- ✅ Can publish packages to npm later
- ✅ Can extract packages to separate repos if needed

### 5. **Better Organization**
- ✅ Clear boundaries between apps and packages
- ✅ Explicit dependencies via package.json
- ✅ Type-safe imports across packages
- ✅ Easy to track what depends on what

---

## 🎯 Usage Examples

### Adding a New App

```bash
# Create new app
mkdir -p apps/customer-portal
cd apps/customer-portal

# Initialize package
pnpm init

# Install from workspace
pnpm add @reacterial/ui@workspace:*
pnpm add @reacterial/auth@workspace:*
pnpm add next react react-dom
```

### Using Shared Components

```typescript
// apps/customer-portal/src/pages/dashboard.tsx
import { BarChart, PageTitle } from '@reacterial/ui';
import { useAuth } from '@reacterial/auth';
import { theme } from '@reacterial/theme';

export default function Dashboard() {
  const { user } = useAuth();
  
  return (
    <div>
      <PageTitle>Customer Dashboard</PageTitle>
      <BarChart series={data} xAxis={labels} />
    </div>
  );
}
```

### Filtered Commands

```bash
# Run dev for specific app
pnpm --filter @reacterial/admin dev

# Build all apps
pnpm --filter "./apps/*" build

# Lint specific package
pnpm --filter @reacterial/ui lint

# Run tests for everything
pnpm --recursive test

# Install dependency in specific app
pnpm --filter @reacterial/admin add axios
```

---

## 🔄 Migration Strategy

### Step 1: Create New Structure (Non-Breaking)
```bash
mkdir -p apps/admin packages/{ui,auth,theme,config,utils}
```

### Step 2: Move Current App
```bash
# Move app files to apps/admin/
mv src apps/admin/
mv pages apps/admin/src/  # if exists
mv public apps/admin/
mv next.config.mjs apps/admin/
```

### Step 3: Extract Shared Packages
```bash
# Create UI package
mkdir -p packages/ui/src/{charts,data-display,layout,ui}
# Move components...
```

### Step 4: Update Workspace Config
```yaml
# pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'packages/*'
  - 'db'
```

### Step 5: Update Dependencies
```bash
# In apps/admin/
pnpm add @reacterial/ui@workspace:*
pnpm add @reacterial/auth@workspace:*
```

### Step 6: Update Imports
```bash
# Find and replace imports across the codebase
# From: '@/components/BarChart'
# To: '@reacterial/ui'
```

---

## 🎨 Alternative: Gradual Migration

If you want to test the waters first:

### Minimal Monorepo (Start Small)
```
reacterial/
├── apps/
│   └── admin/              # Current app moved here
├── packages/
│   └── ui/                 # Just extract RT components
├── db/
└── pnpm-workspace.yaml
```

**Then expand later:**
- Add `packages/auth` when building second app
- Add `packages/theme` when you need theme sharing
- Add new apps as needed

---

## 🎯 Recommended Approach for Reacterial

Given your current state, I recommend:

### **Option A: Full Monorepo (Recommended)**
Best if you plan to build multiple apps in the next 3-6 months.

**Pros:**
- ✅ Proper architecture from the start
- ✅ No need to refactor later
- ✅ Ready for scaling

**Cons:**
- ⏱️ Takes more time upfront
- 🔧 More configuration needed

### **Option B: Hybrid Approach (Conservative)**
Keep current structure, but prepare for monorepo.

**Steps:**
1. Organize components using domain-driven structure (as per Component Guide)
2. Keep everything in current location for now
3. When adding 2nd app, migrate to monorepo structure

**Pros:**
- ⚡ Quick to implement
- 🔄 Can migrate later

**Cons:**
- 🔄 Will need migration work later
- 🎯 Less organized in the meantime

---

## 💡 My Recommendation

Based on your question about "building multiple apps in the future," I recommend:

**Go with Full Monorepo (Option A)** because:

1. ✅ You're already planning for multiple apps
2. ✅ PNPM makes this easy
3. ✅ Better developer experience
4. ✅ Industry best practice
5. ✅ Easier to maintain long-term
6. ✅ Can publish packages to npm later if needed

---

## 📚 Resources

- [PNPM Workspaces](https://pnpm.io/workspaces)
- [Monorepo Best Practices](https://monorepo.tools/)
- [Turborepo](https://turbo.build/repo) - Optional build system for monorepos
- [Vercel Monorepo Guide](https://vercel.com/docs/monorepos)

---

**Next Steps:**
Would you like me to implement the full monorepo structure, or start with the hybrid approach?

---

**Last Updated**: October 21, 2025  
**Project**: Reacterial v0.1.0  
**Architecture**: PNPM Monorepo

