# Storybook & Design System Plan

## Goal

Build a living component design system for `@reacterial/ui` using Storybook, so developers can explore, develop, and test components in isolation — without running the full admin app (no MongoDB, no NextAuth, no Redux required).

---

## Why

Right now, to see any `@reacterial/ui` component render, you need:
- MongoDB running with seed data
- `.env.local` configured with secrets
- Full Next.js dev server

With Storybook:
```bash
pnpm --filter @reacterial/ui storybook   # that's it
```

**Benefits:**
- **Isolated development** — build and iterate on components without the app
- **Visual documentation** — every component prop and variant is browsable
- **Faster onboarding** — new developers see the design system before touching the app
- **Catches visual regressions** — snapshot testing per story
- **Supports the learning platform goal** — a visual reference for monorepo patterns

---

## Architecture

Storybook lives inside `packages/ui/` — colocated with the components it documents.

```
packages/ui/
├── .storybook/
│   ├── main.ts          # Storybook config (webpack/vite, addons)
│   └── preview.ts       # Global decorators (MUI theme, CssBaseline)
├── src/
│   ├── charts/
│   │   ├── BarChart.tsx
│   │   ├── BarChart.stories.tsx    ← colocated story
│   │   ├── LineChart.tsx
│   │   ├── LineChart.stories.tsx
│   │   ├── PieChart.tsx
│   │   └── PieChart.stories.tsx
│   ├── data-display/
│   │   ├── DataGrid.tsx
│   │   ├── DataGrid.stories.tsx
│   │   ├── TopSummary.tsx
│   │   └── TopSummary.stories.tsx
│   ├── ui/
│   │   ├── ErrorMessage/
│   │   │   ├── ErrorMessage.tsx
│   │   │   ├── ErrorMessage.stories.tsx
│   │   │   └── ErrorMessage.test.tsx
│   │   ├── ProfileDropdown/
│   │   │   ├── ProfileDropdown.tsx
│   │   │   └── ProfileDropdown.stories.tsx
│   │   ├── PageTitle.tsx
│   │   └── PageTitle.stories.tsx
│   └── layout/
│       ├── MainContent.tsx
│       └── MainContent.stories.tsx
└── package.json
```

---

## Implementation Plan

### Phase 1: Setup ✅ (complete)

**1. Install dependencies in `packages/ui/`**

```bash
pnpm --filter @reacterial/ui add -D \
  @storybook/react \
  @storybook/react-vite \
  @storybook/addon-essentials \
  @storybook/addon-a11y \
  storybook
```

**2. Initialize Storybook config**

`packages/ui/.storybook/main.ts`:
```ts
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
};

export default config;
```

**3. Global MUI theme decorator**

`packages/ui/.storybook/preview.ts`:
```ts
import type { Preview } from '@storybook/react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import React from 'react';

const theme = createTheme();

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
```

**4. Add scripts to `packages/ui/package.json`**

```json
"storybook": "storybook dev -p 6006",
"build-storybook": "storybook build"
```

**5. Add root-level shortcut to `package.json`**

```json
"storybook": "turbo run storybook --filter=@reacterial/ui"
```

---

### Phase 2: Write Stories ✅ (complete)

Each story file follows the same pattern:

```tsx
// BarChart.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import BarChart from './BarChart';

const meta: Meta<typeof BarChart> = {
  title: 'Charts/BarChart',
  component: BarChart,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BarChart>;

export const Default: Story = {
  args: {
    series: [{ data: [35, 44, 24, 34] }],
    xAxis: ['Q1', 'Q2', 'Q3', 'Q4'],
  },
};

export const MultiSeries: Story = {
  args: {
    series: [
      { data: [35, 44, 24, 34] },
      { data: [51, 6, 49, 30] },
    ],
    xAxis: ['Q1', 'Q2', 'Q3', 'Q4'],
  },
};
```

**Story coverage plan:**

| Component | Stories | Status |
|-----------|---------|--------|
| `ErrorMessage` | WithMessage, NoMessage | ✅ Done |
| `ProfileDropdown` | Default, NoAvatar, NoMenuGroups | ✅ Done |
| `BarChart` | SingleSeries, MultiSeries | ✅ Done |
| `PieChart` | Default, CustomSize | ✅ Done |
| `LineChart` | Default | ✅ Done |
| `DataGrid` | WithData, EmptyState, LoadingState | ✅ Done |
| `TopSummary` | Default | ✅ Done |
| `PageTitle` | WithDivider, WithoutDivider | ✅ Done |
| `MainContent` | DrawerOpen, DrawerClosed | ✅ Done |

---

### Phase 3: Dark Mode Support

Add a toolbar toggle for light/dark mode using Storybook's globals:

```ts
// preview.ts — extended
const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: ['light', 'dark'],
      },
    },
  },
  decorators: [
    (Story, context) => {
      const mode = context.globals['theme'] ?? 'light';
      const theme = createTheme({ palette: { mode } });
      return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Story />
        </ThemeProvider>
      );
    },
  ],
};
```

---

### Phase 4: CI Integration (future)

- Add `build-storybook` to Turborepo `turbo.json` pipeline
- Publish Storybook to Chromatic or GitHub Pages on merge to main
- Enable visual regression testing via Chromatic snapshots

---

## Running Storybook

```bash
# From monorepo root
pnpm storybook

# Or directly
pnpm --filter @reacterial/ui storybook
```

Opens at http://localhost:6006

---

## Success Criteria

- [ ] Storybook boots with `pnpm storybook` — no app, no DB required
- [x] All 9 `@reacterial/ui` components have at least one story
- [x] `autodocs` generates API documentation from TypeScript props
- [ ] Light/dark mode toggle works in the Storybook toolbar
- [x] `build-storybook` produces a static build in `packages/ui/storybook-static/`
- [x] `.gitignore` covers `storybook-static/`

---

## Out of Scope (for now)

- Chromatic / visual regression CI (Phase 4)
- Stories for admin app components (`Header`, `Sidebar`, `LayoutAdmin`)
- Interaction tests (`@storybook/addon-interactions`)
- Custom design tokens / theme customizer UI
