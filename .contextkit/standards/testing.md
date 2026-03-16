# Testing Standards

## Stack

- **Framework**: Jest 29 + React Testing Library 16
- **Environment**: jsdom (`jest-environment-jsdom`)
- **Assertion library**: `@testing-library/jest-dom` (extended matchers)
- **Config**: `apps/admin/jest.config.js` uses `next/jest` factory (`createJestConfig`)
- **Setup file**: `apps/admin/jest.setup.js` (runs `@testing-library/jest-dom`)
- **Run**: `pnpm test` (watch) | `pnpm test:ci` (CI, passWithNoTests)
- **Single file**: `pnpm --filter @reacterial/admin jest path/to/test.test.tsx`

## Existing Tests

Currently only one component has tests:
- `packages/ui/src/ui/RtError/RtError.test.tsx` — 2 test cases, uses `test()` not `it()`

Both `it()` and `test()` are acceptable. Numbered descriptions are required for both.

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

## Test Structure — AAA Pattern

Every test should follow **Arrange → Act → Assert**:

```typescript
it('2. calls onDelete when delete button is clicked', async () => {
  // Arrange
  const user = userEvent.setup();
  const onDelete = jest.fn();
  render(<UserCard userId="1" onDelete={onDelete} />);

  // Act
  await user.click(screen.getByRole('button', { name: /delete/i }));

  // Assert
  expect(onDelete).toHaveBeenCalledWith('1');
});
```

## Patterns

### Component Tests — Use `defaultProps`

Define `defaultProps` at the top of each describe block so individual tests only override what they need:

```typescript
import { render, screen } from '@testing-library/react';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  const defaultProps = {
    title: 'Test Title',
    onAction: jest.fn(),
  };

  it('1. renders the component', () => {
    render(<ComponentName {...defaultProps} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('2. does not render when condition is false', () => {
    render(<ComponentName {...defaultProps} message={null} />);
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

### Mock Factories

Use factory functions for test data so individual tests can override only what they care about:

```typescript
const createMockUser = (overrides = {}) => ({
  id: 'user-1',
  name: 'Test User',
  email: 'test@example.com',
  role: 'user' as const,
  image: '',
  phone: '',
  address: '',
  ...overrides,
});

const mockUser = createMockUser();
const mockAdmin = createMockUser({ role: 'admin' });
```

### Error Handling Tests

Always cover the failure path for components that can error:

```typescript
it('4. shows error state when message is provided', () => {
  render(<ComponentName {...defaultProps} errorMessage="Something went wrong" />);
  expect(screen.getByRole('alert')).toHaveTextContent('Something went wrong');
});

it('5. handles null/undefined props gracefully', () => {
  render(<ComponentName {...defaultProps} items={[]} />);
  expect(screen.getByText('No results found')).toBeInTheDocument();
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

## Performance

- Keep individual tests under 100ms
- Use `jest.useFakeTimers()` for time-based behavior
- Mock heavy operations and external API calls

## Code Review Checklist

Before submitting tests, verify:

- [ ] All test descriptions start with a number (`1.`, `2.`, `3.`)
- [ ] `defaultProps` defined at the top of `describe` block
- [ ] Tests are isolated — no shared mutable state between tests
- [ ] Error and null/undefined prop cases are covered
- [ ] Role-based queries used (`getByRole`) over text/testid where possible
- [ ] `jest.mock()` calls are at the top of the file, before imports
- [ ] No implementation details tested (internal state, private methods)
