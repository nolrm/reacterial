# Testing Standards

## Stack

- **Framework**: Jest 29 + React Testing Library 16
- **Environment**: jsdom (`jest-environment-jsdom`)
- **Assertion library**: `@testing-library/jest-dom` (extended matchers)
- **Run**: `pnpm test` (watch) | `pnpm test:ci` (CI, passWithNoTests)
- **Single file**: `pnpm --filter @reacterial/admin jest path/to/test.test.tsx`

## Required: Numbered Test Cases

All `it()` / `test()` descriptions MUST start with a number:

```typescript
describe('ComponentName', () => {
  it('1. renders with default props', () => { ... });
  it('2. shows error message when message is not null', () => { ... });
  it('3. does not render when message is null', () => { ... });
  it('4. calls onClick handler when button is clicked', () => { ... });
});
```

Numbers make failing tests instantly identifiable in CI output and bug reports.

## File Placement

- **Colocate** tests next to the component they test:
  ```
  RtError/
  ├── RtError.tsx
  ├── RtError.test.tsx   ← here
  └── index.ts
  ```
- For pages and API routes, place tests in `__tests__/` adjacent to the file

## Patterns

### Component Tests

```typescript
import { render, screen } from '@testing-library/react';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('1. renders the component', () => {
    render(<ComponentName prop="value" />);
    expect(screen.getByText('expected text')).toBeInTheDocument();
  });

  it('2. does not render when condition is false', () => {
    render(<ComponentName message={null} />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
```

### Redux-Connected Components

Wrap with a test store provider:

```typescript
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/redux/userSlice';

const store = configureStore({ reducer: { user: userReducer } });

render(
  <Provider store={store}>
    <ConnectedComponent />
  </Provider>
);
```

### User Interactions

```typescript
import userEvent from '@testing-library/user-event';

it('3. submits form on button click', async () => {
  const user = userEvent.setup();
  render(<LoginForm />);
  await user.type(screen.getByLabelText('Email'), 'test@example.com');
  await user.click(screen.getByRole('button', { name: /sign in/i }));
  expect(screen.getByText('Success')).toBeInTheDocument();
});
```

## What to Test

| Area | Priority | Notes |
|------|----------|-------|
| UI components (packages/ui) | High | All render paths, null/undefined props |
| Auth components (withAuth, LoginForm) | High | Auth states, redirects |
| Redux slices | Medium | Each action/reducer |
| API routes | Medium | Mock mongoose, test each HTTP method |
| Pages | Low | Integration-level, mock heavy deps |
| Utility functions | High | Pure functions are easy wins |

## What NOT to Test

- MUI internals
- Third-party library behavior
- Next.js routing internals
- Redux Toolkit boilerplate (createSlice itself)

## Mocking

- Mock `next-auth/react` for session-dependent components
- Mock `next/router` for navigation tests
- Mock `axios` for service layer tests
- Use `jest.mock('module')` at the top of the file, before imports

```typescript
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({ data: null, status: 'unauthenticated' })),
  signIn: jest.fn(),
}));
```

## Coverage Goals

- UI package components: aim for 80%+ coverage
- Auth package: aim for 80%+ coverage
- Admin pages: aim for 60%+ coverage
- API routes: aim for 70%+ coverage
