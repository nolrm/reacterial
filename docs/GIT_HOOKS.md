# Git Hooks - Code Quality Enforcement

## 🎯 Overview

This project uses **ContextKit hooks** to enforce code quality standards automatically before pushes. Git is configured to use `.contextkit/hooks/` via `git config core.hooksPath .contextkit/hooks`.

---

## 🔒 What Gets Checked

### **Pre-Push Hook** (Before pushing to remote)

- ✅ **Format** - Runs Prettier write; blocks push if any files were reformatted (commit them first)
- ✅ **Linting** - Checks entire codebase for errors
- ✅ **Unit Tests** - Runs all tests in CI mode

### **Commit-Msg Hook** (On every commit)

- ✅ Validates conventional commit format (`feat:`, `fix:`, `docs:`, etc.)

---

## 📋 Hooks Configuration

### Pre-Push Hook

**Location**: `.contextkit/hooks/pre-push`

**What it does**:

1. Runs Prettier (`pnpm run format`) — auto-formats all files
2. Checks for uncommitted changes — if Prettier reformatted anything, the push is blocked with a prompt to stage and commit the changes
3. Checks for linting errors (`pnpm run lint`)
4. Runs all unit tests in CI mode (`pnpm --filter @reacterial/admin test:ci`)

> **E2E tests are intentionally excluded from pre-push.** Run manually when needed: `pnpm --filter @reacterial/admin e2e`

### Commit-Msg Hook

**Location**: `.contextkit/hooks/commit-msg`

Validates that the commit subject follows conventional format:

```
<type>(<scope>): <description>
```

Valid types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `improve`

---

## 🎬 How It Works

### Pushing Code

```bash
git push
```

**What happens:**

1. ContextKit pre-push hook runs
2. **Step 1**: Runs Prettier — reformats if needed, then fails if any files changed
3. **Step 2**: Runs linter on all code — fails if linting errors exist
4. **Step 3**: Runs all unit tests — fails if any test fails
5. If all pass → Push proceeds ✅

---

## 🚀 Manual Scripts

```bash
pnpm format          # Format all code
pnpm format:check    # Check if code is formatted (no write)
pnpm lint            # Lint all code
pnpm lint:fix        # Auto-fix linting issues
pnpm test:ci         # Run all tests
```

---

## ⚠️ When Hooks Fail

### Pre-Push: Formatting Issues

```
❌ Prettier reformatted files — stage and commit them before pushing.
```

```bash
git add .
git commit -m "chore: fix formatting"
git push
```

### Pre-Push: Linting Errors

```bash
pnpm lint:fix   # try auto-fix first
pnpm lint       # check remaining issues
```

### Pre-Push: Test Failures

```bash
pnpm test   # run locally to see failures, fix, commit, push
```

### Commit-Msg: Invalid Format

```
❌ Commit message must follow conventional format
```

Use a valid type prefix: `feat: add login page`, `fix(auth): handle null session`, etc.

---

## 🛑 Bypassing Hooks (NOT Recommended)

```bash
git push --no-verify    # skip pre-push
git commit --no-verify  # skip commit-msg
```

---

## 🔧 Configuration

### Active Hooks

- `.contextkit/hooks/pre-push` - Format write → lint → tests
- `.contextkit/hooks/commit-msg` - Conventional commit validation

### Troubleshooting: Hooks not running

```bash
git config core.hooksPath
# Should output: .contextkit/hooks

ls -la .contextkit/hooks/
# Should see commit-msg, pre-push

pnpm run prepare   # re-run to reset hooks path
```

---

## 📈 CI/CD Integration

**Local (ContextKit hooks):**

- Pre-push: Format write → lint → tests
- Commit-msg: Conventional format validation

**CI/CD (GitHub Actions/Vercel):**

- Pull Request: Full build + tests + deployment preview
- Main branch: Full build + tests + production deployment

---

## ✅ Quick Reference

| Command               | Description                                 |
| --------------------- | ------------------------------------------- |
| `git push`            | Triggers pre-push hook (format, lint, test) |
| `git commit`          | Triggers commit-msg validation              |
| `pnpm format`         | Format all code                             |
| `pnpm lint`           | Lint all code                               |
| `pnpm lint:fix`       | Auto-fix linting issues                     |
| `pnpm test:ci`        | Run all tests                               |
| `git push --no-verify`| Skip pre-push hook                          |

---

**Last Updated**: March 17, 2026
**Active Hooks Path**: `.contextkit/hooks` (set via `git config core.hooksPath`)
