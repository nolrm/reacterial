# Git Hooks with Husky - Code Quality Enforcement

## 🎯 Overview

This project uses **Husky** and **lint-staged** to enforce code quality standards automatically before commits and pushes.

---

## 🔒 What Gets Checked

### **Pre-Commit Hook** (On every commit)

Runs **lint-staged** which:

- ✅ Formats code with **Prettier**
- ✅ Fixes linting issues with **ESLint**
- ✅ Only checks **staged files** (fast!)

### **Pre-Push Hook** (Before pushing to remote)

Runs comprehensive checks:

- ✅ **Format Check** - Ensures all files are properly formatted
- ✅ **Linting** - Checks entire codebase for errors
- ✅ **Unit Tests** - Runs all tests in CI mode

---

## 📋 Hooks Configuration

### Pre-Commit Hook

**Location**: `.husky/pre-commit`

```bash
pnpm run pre-commit
```

**What it does**:

- Runs `lint-staged` on staged files
- Formats `.js`, `.ts`, `.tsx` files with Prettier
- Fixes ESLint errors automatically
- Formats `.json`, `.css`, `.scss`, `.md` files

### Pre-Push Hook

**Location**: `.contextkit/hooks/pre-push` (active via `git config core.hooksPath .contextkit/hooks`)

> Note: `.husky/pre-push` exists but is superseded by ContextKit hooks. The active hook path is set by the `prepare` script in root `package.json`.

**What it does**:

1. Runs Prettier (`pnpm run format`) — auto-formats all files
2. Checks for uncommitted changes — if Prettier reformatted anything, the push is blocked with a prompt to stage and commit the changes
3. Checks for linting errors (`pnpm run lint`)
4. Runs all unit tests in CI mode (`pnpm --filter @reacterial/admin test:ci`)
   - ✅ Passes with exit code 0 if no tests exist (using `--passWithNoTests`)
   - ❌ Fails if any test fails

> **E2E tests are intentionally excluded from pre-push.** Run manually when needed: `pnpm --filter @reacterial/admin e2e`

---

## 🎬 How It Works

### Committing Code

```bash
git add .
git commit -m "feat: add new feature"
```

**What happens:**

1. Husky intercepts the commit
2. Runs lint-staged on your staged files
3. Prettier formats the code
4. ESLint fixes auto-fixable issues
5. If all passes → Commit succeeds ✅
6. If any fail → Commit blocked ❌

### Pushing Code

```bash
git push
```

**What happens:**

1. ContextKit hook intercepts the push
2. **Step 1**: Checks code formatting
   - ❌ Fails if any file isn't formatted
3. **Step 2**: Runs linter on all code
   - ❌ Fails if linting errors exist
4. **Step 3**: Runs all unit tests
   - ❌ Fails if any test fails
5. If all pass → Push proceeds ✅
6. If any fail → Push blocked ❌

---

## 🚀 Available Scripts

### Automatic (via Hooks)

```bash
pnpm run pre-commit   # Runs lint-staged
pnpm run pre-push     # Runs format check + lint + tests
```

### Manual

```bash
# Format all code
pnpm format

# Check if code is formatted
pnpm format:check

# Lint all code
pnpm lint

# Lint and auto-fix issues
pnpm lint:fix

# Run tests
pnpm test:ci
```

---

## ⚠️ When Hooks Fail

### Pre-Commit Fails

**Symptom:**

```
❌ Formatting check failed!
❌ Linting failed!
```

**Solution:**

```bash
# Fix formatting
pnpm format

# Fix linting
pnpm lint:fix

# Try commit again
git add .
git commit -m "your message"
```

### Pre-Push Fails

**Scenario 1: Formatting Issues**

```
❌ Formatting check failed! Run 'pnpm format' to fix.
```

**Solution:**

```bash
pnpm format
git add .
git commit -m "chore: fix formatting"
git push
```

**Scenario 2: Linting Errors**

```
❌ Linting failed! Fix the errors or run 'pnpm lint:fix'.
```

**Solution:**

```bash
# Try auto-fix
pnpm lint:fix

# If issues remain, fix manually
pnpm lint  # See what needs fixing

# Then commit and push
git add .
git commit -m "fix: resolve linting errors"
git push
```

**Scenario 3: Test Failures**

```
❌ Tests failed! Fix the failing tests.
```

**Solution:**

```bash
# Run tests locally to see failures
pnpm test

# Fix the failing tests
# Then commit and push
git add .
git commit -m "fix: resolve test failures"
git push
```

---

## 🛑 Bypassing Hooks (NOT Recommended)

### Skip Pre-Commit (Use sparingly!)

```bash
git commit -m "message" --no-verify
```

### Skip Pre-Push (Use sparingly!)

```bash
git push --no-verify
```

**⚠️ Warning**: Only bypass hooks if absolutely necessary. Your code may fail CI/CD checks later!

---

## 🔧 Configuration Files

### package.json - lint-staged

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["prettier --write", "eslint --fix"],
    "*.{json,css,scss,md}": ["prettier --write"]
  }
}
```

### .husky/pre-commit

```bash
pnpm run pre-commit
```

### .contextkit/hooks/pre-push

The active pre-push hook. Runs format check → lint → unit tests for the admin app. E2E tests are excluded (run manually with `pnpm --filter @reacterial/admin e2e`).

---

## 📊 Workflow Example

### Happy Path ✅

```bash
# 1. Make changes
vim apps/admin/src/pages/admin/index.tsx

# 2. Stage changes
git add apps/admin/src/pages/admin/index.tsx

# 3. Commit (pre-commit hook runs)
git commit -m "feat: update dashboard"
# → ✅ Prettier formats code
# → ✅ ESLint fixes issues
# → ✅ Commit successful

# 4. Push (pre-push hook runs)
git push
# → ✅ Format check passed
# → ✅ Linting passed
# → ✅ Tests passed
# → ✅ Push successful
```

### Unhappy Path (with fixes) ❌ → ✅

```bash
# 1. Make changes with errors
vim apps/admin/src/pages/admin/index.tsx
# (forgot semicolon, wrong formatting)

# 2. Try to commit
git add .
git commit -m "feat: update dashboard"
# → ✅ Pre-commit hook auto-fixes issues
# → ✅ Commit successful

# 3. Try to push (but tests fail)
git push
# → ✅ Format check passed
# → ✅ Linting passed
# → ❌ Tests failed!
# → ❌ Push blocked

# 4. Fix tests
pnpm test
# (see what failed, fix it)

# 5. Commit fix
git add .
git commit -m "fix: resolve test failure"

# 6. Push again
git push
# → ✅ All checks passed
# → ✅ Push successful
```

---

## 🎯 Benefits

### For You

- ✅ **Automated** - No manual formatting or linting needed
- ✅ **Fast feedback** - Catch issues before they reach CI/CD
- ✅ **Consistent code** - Entire team follows same standards
- ✅ **Fewer PR comments** - Code is already clean

### For the Team

- ✅ **No broken code** - Tests must pass before pushing
- ✅ **Clean git history** - Only working code gets committed
- ✅ **Faster reviews** - No nitpicking on formatting
- ✅ **Better quality** - Enforced standards

---

## 🔍 Troubleshooting

### Hooks not running

**Check the active hooks path:**

```bash
git config core.hooksPath
# Should output: .contextkit/hooks
```

**Check hook files exist and are executable:**

```bash
ls -la .contextkit/hooks/
# Should see pre-commit and pre-push files
```

**Reinstall (re-runs prepare script):**

```bash
pnpm install
```

### "command not found: pnpm" in hooks

**Solution:** Ensure pnpm is in your PATH:

```bash
which pnpm
# Should output: /Users/your-user/.volta/bin/pnpm or similar
```

### Lint-staged not finding files

**Check git status:**

```bash
git status
# Ensure files are staged
```

**Check lint-staged config:**

```bash
cat package.json | grep -A 10 "lint-staged"
```

### Tests take too long in pre-push

**Option 1:** Run only changed tests (configure Jest)

**Option 2:** Skip tests occasionally (not recommended):

```bash
git push --no-verify
```

**Option 3:** Remove tests from pre-push (edit `.husky/pre-push`)

---

## 📦 What's Installed

### Packages

- **husky** `^9.1.7` - Git hooks manager
- **lint-staged** `^16.2.5` - Run linters on staged files

### Configuration

- `.contextkit/hooks/pre-commit` - Active pre-commit hook (via `core.hooksPath`)
- `.contextkit/hooks/pre-push` - Active pre-push hook (via `core.hooksPath`)
- `.husky/pre-commit`, `.husky/pre-push` - Husky hooks (superseded by ContextKit)
- `package.json` - Scripts and lint-staged config

---

## 🎓 Best Practices

### DO ✅

- ✅ Let hooks auto-fix issues when possible
- ✅ Run `pnpm lint:fix` before committing
- ✅ Run `pnpm test` locally before pushing
- ✅ Keep hooks fast (< 30 seconds)
- ✅ Fix issues found by hooks immediately

### DON'T ❌

- ❌ Bypass hooks regularly with `--no-verify`
- ❌ Commit broken code
- ❌ Push without running tests
- ❌ Ignore linting errors
- ❌ Commit unformatted code

---

## 🔄 Updating Hooks

### Add new check to pre-push

Edit `.contextkit/hooks/pre-push`:

```bash
# Add new check
pnpm run type-check || exit 1
```

### Modify lint-staged config

Edit `package.json`:

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "prettier --write",
      "eslint --fix",
      "jest --findRelatedTests" // ← Add this
    ]
  }
}
```

---

## 📈 CI/CD Integration

These hooks complement your CI/CD pipeline:

**Local (Husky):**

- Pre-commit: Format + lint staged files
- Pre-push: Format check + lint + tests

**CI/CD (GitHub Actions/Vercel):**

- Pull Request: Full build + tests + deployment preview
- Main branch: Full build + tests + production deployment

**Benefits:**

- Faster feedback locally
- Fewer failed CI/CD runs
- Lower build costs

---

## ✅ Quick Reference

| Command                  | Description                                 |
| ------------------------ | ------------------------------------------- |
| `git commit`             | Triggers pre-commit hook (lint-staged)      |
| `git push`               | Triggers pre-push hook (format, lint, test) |
| `pnpm format`            | Format all code                             |
| `pnpm format:check`      | Check if code is formatted                  |
| `pnpm lint`              | Lint all code                               |
| `pnpm lint:fix`          | Auto-fix linting issues                     |
| `pnpm test:ci`           | Run all tests                               |
| `git commit --no-verify` | Skip pre-commit hook                        |
| `git push --no-verify`   | Skip pre-push hook                          |

---

**Last Updated**: March 17, 2026
**Husky Version**: 9.1.7 (installed, superseded by ContextKit hooks)
**Lint-Staged Version**: 16.2.5
**Active Hooks Path**: `.contextkit/hooks` (set via `git config core.hooksPath`)
