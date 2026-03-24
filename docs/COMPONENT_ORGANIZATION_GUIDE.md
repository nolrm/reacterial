# Component Organization Guide

## Current Structure Analysis

### Current RT/Global Components
```
src/components/
├── BarChart.tsx          # Chart: Bar visualization
├── LineChart.tsx         # Chart: Line visualization  
├── PieChart.tsx          # Chart: Pie visualization
├── DataGrid.tsx          # Data: Grid/table component
├── ErrorMessage/                # UI: Error display
├── TopSummary.tsx        # Data: Summary metrics card
├── ProfileDropdown.tsx   # Layout: User profile menu
├── PageTitle.tsx           # UI: Page heading component
├── ThemeProvider.tsx       # Provider: Theme management
├── blocks/                 # Layout: Header, Sidebar, MainContent
├── landing/                # Feature: Landing page components
└── login/                  # Feature: Authentication components
```

---

## 🎯 RECOMMENDED: Domain-Driven Organization

### New Proposed Structure

```
src/
├── components/
│   ├── ui/                          # ✨ Reusable UI Primitives
│   │   ├── PageTitle/
│   │   │   ├── PageTitle.tsx
│   │   │   ├── PageTitle.test.tsx
│   │   │   └── index.ts
│   │   ├── ErrorMessage/
│   │   │   ├── ErrorMessage.tsx
│   │   │   ├── ErrorMessage.test.tsx
│   │   │   └── index.ts
│   │   └── index.ts                 # Barrel export: export * from './PageTitle'
│   │
│   ├── charts/                      # 📊 Data Visualization
│   │   ├── BarChart/
│   │   │   ├── BarChart.tsx
│   │   │   ├── BarChart.stories.tsx
│   │   │   ├── BarChart.test.tsx
│   │   │   └── index.ts
│   │   ├── LineChart/
│   │   │   ├── LineChart.tsx
│   │   │   ├── LineChart.test.tsx
│   │   │   └── index.ts
│   │   ├── PieChart/
│   │   │   ├── PieChart.tsx
│   │   │   ├── PieChart.test.tsx
│   │   │   └── index.ts
│   │   └── index.ts                 # Export all charts
│   │
│   ├── data-display/                # 🗂️ Data Presentation
│   │   ├── DataGrid/
│   │   │   ├── DataGrid.tsx
│   │   │   ├── DataGrid.test.tsx
│   │   │   └── index.ts
│   │   ├── TopSummary/
│   │   │   ├── TopSummary.tsx
│   │   │   ├── TopSummary.test.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── layout/                      # 🏗️ Layout Components
│   │   ├── Header/
│   │   │   ├── Header.tsx
│   │   │   ├── Header.test.tsx
│   │   │   └── index.ts
│   │   ├── Sidebar/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Sidebar.test.tsx
│   │   │   └── index.ts
│   │   ├── MainContent/
│   │   │   ├── MainContent.tsx
│   │   │   └── index.ts
│   │   ├── ProfileDropdown/
│   │   │   ├── ProfileDropdown.tsx
│   │   │   ├── ProfileDropdown.test.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── auth/                        # 🔐 Authentication
│   │   ├── LoginForm/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── LoginForm.test.tsx
│   │   │   └── index.ts
│   │   ├── UserSessionHandler/
│   │   │   ├── UserSessionHandler.tsx
│   │   │   └── index.ts
│   │   ├── withAuth/
│   │   │   ├── withAuth.tsx
│   │   │   ├── withAuth.test.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── landing/                     # 🌐 Landing Page
│   │   ├── Banner/
│   │   │   ├── Banner.tsx          (from banner.tsx)
│   │   │   └── index.ts
│   │   ├── Footer/
│   │   │   ├── Footer.tsx          (from footer.tsx)
│   │   │   └── index.ts
│   │   ├── Header/
│   │   │   ├── LandingHeader.tsx   (renamed from header.tsx)
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   └── providers/                   # 🎨 Context Providers
│       ├── ThemeProvider/
│       │   ├── ThemeProvider.tsx
│       │   ├── ThemeProvider.test.tsx
│       │   └── index.ts
│       └── index.ts
```

---

## Import Examples

### Before (Current)
```typescript
import BarChart from '@/components/BarChart';
import DataGrid from '@/components/DataGrid';
import PageTitle from '@/components/PageTitle';
import Header from '@/components/blocks/Header';
import LoginForm from '@/components/login/LoginForm';
```

### After (Organized)
```typescript
// Option 1: Direct imports
import { BarChart } from '@/components/charts';
import { DataGrid } from '@/components/data-display';
import { PageTitle } from '@/components/ui';
import { Header } from '@/components/layout';
import { LoginForm } from '@/components/auth';

// Option 2: Grouped imports
import { BarChart, LineChart, PieChart } from '@/components/charts';
import { DataGrid, TopSummary } from '@/components/data-display';
```

---

## Migration Strategy

### Phase 1: Create New Structure (No Breaking Changes)
1. Create new folders: `ui/`, `charts/`, `data-display/`, `layout/`, `auth/`, `providers/`
2. Move components to their respective folders
3. Create `index.ts` barrel exports for each folder

### Phase 2: Update Imports
1. Update all import statements in pages
2. Update imports in other components
3. Run tests to verify nothing breaks

### Phase 3: Cleanup
1. Remove old component files
2. Update Storybook config
3. Document new structure in README

---

## Benefits of This Approach

### ✅ Developer Experience
- **Faster navigation**: Know exactly where to find components
- **Clearer purpose**: Component location indicates its role
- **Easier onboarding**: New developers understand structure immediately

### ✅ Scalability
- **Easy to add**: New components have clear homes
- **Easy to refactor**: Related components grouped together
- **Easy to test**: Test files co-located with components

### ✅ Future-Proofing
- **Storybook**: Stories written for all 9 components — run `pnpm storybook`
- **Tree-shaking friendly**: Barrel exports enable better bundling
- **Package extraction**: Easy to publish as separate packages

### ✅ Team Collaboration
- **Reduce conflicts**: Team members work in different folders
- **Clear ownership**: Each domain can have dedicated maintainers
- **Better code review**: Changes are logically grouped

---

## Alternative Approaches

### Alternative 1: Flat RT Library
```
src/components/rt-ui/
  ├── BarChart/
  ├── LineChart/
  ├── PieChart/
  ├── DataGrid/
  ├── ErrorMessage/
  └── index.ts
```
**Best for**: Projects planning to publish components as npm package

### Alternative 2: Atomic Design
```
src/components/
  ├── atoms/       # PageTitle, ErrorMessage
  ├── molecules/   # BarChart, LineChart
  ├── organisms/   # DataGrid, Header
  └── templates/   # LayoutAdmin
```
**Best for**: Design-system-first projects with Figma integration

---

## Naming Conventions

### Component Files
- **PascalCase**: `BarChart.tsx`, `PageTitle.tsx`
- **Match folder name**: Folder `BarChart/` contains `BarChart.tsx`

### Index Files
```typescript
// components/charts/BarChart/index.ts
export { default } from './BarChart';
export * from './BarChart';

// components/charts/index.ts
export { default as BarChart } from './BarChart';
export { default as LineChart } from './LineChart';
export { default as PieChart } from './PieChart';
```

### Test Files
- **Co-located**: `BarChart.test.tsx` next to `BarChart.tsx`
- **Naming**: Component name + `.test.tsx`

---

## Implementation Checklist

- [ ] Create new folder structure
- [ ] Move components to new locations
- [ ] Create barrel exports (`index.ts`)
- [ ] Update imports in `src/pages/admin/*`
- [ ] Update imports in `src/layouts/*`
- [ ] Update imports in other components
- [ ] Run tests: `pnpm test:ci`
- [ ] Run linter: `pnpm lint`
- [ ] Run build: `pnpm build`
- [ ] Update this guide in README.md
- [ ] Delete old component files

---

## Questions?

### Should I keep the "Rt" prefix?
**Recommendation**: Keep it! It clearly identifies your custom components vs MUI components.

### Can I mix organizational approaches?
**Recommendation**: Stick to one approach for consistency. Domain-Driven is most suitable for your project.

### What about shared types/interfaces?
**Recommendation**: Create `src/types/components.ts` for shared component types.

---

**Last Updated**: October 21, 2025  
**Project**: Reacterial v0.1.0  
**Approach**: Domain-Driven Organization

