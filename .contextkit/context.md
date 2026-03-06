# ContextKit - Context Entry Point

**Single file to reference for ALL context:** `.contextkit/context.md`

This file tells you what context files are available. Cursor/VS Code auto-load all files.
For CLI tools, this is your quick reference of what standards exist.

## Quick Usage

```bash
# Claude, Gemini, Codex
claude "read .contextkit/context.md to see available standards, then create a button"
```

## Available Context Files

### Standards
- `.contextkit/standards/README.md` - Standards overview
- `.contextkit/standards/glossary.md` - **Project terms & shortcuts**
- `.contextkit/standards/code-style.md` - Coding conventions
- `.contextkit/standards/code-style/css-style.md` - CSS-specific standards
- `.contextkit/standards/code-style/typescript-style.md` - TypeScript-specific standards
- `.contextkit/standards/testing.md` - Test patterns
- `.contextkit/standards/architecture.md` - Architecture decisions
- `.contextkit/standards/ai-guidelines.md` - AI behavior rules
- `.contextkit/standards/workflows.md` - Development workflows

### Product Context
- `.contextkit/product/mission.md` - Product vision and purpose
- `.contextkit/product/mission-lite.md` - Condensed mission for AI context
- `.contextkit/product/roadmap.md` - Development phases and features
- `.contextkit/product/decisions.md` - Architecture Decision Records (ADRs)
- `.contextkit/product/context.md` - Domain-specific context

### Commands
- `.contextkit/commands/analyze.md` - Analyze & customize standards
- `.contextkit/commands/review.md` - Code review
- `.contextkit/commands/fix.md` - Diagnose and fix bugs
- `.contextkit/commands/refactor.md` - Refactor code structure
- `.contextkit/commands/run-tests.md` - Generate or run tests
- `.contextkit/commands/add-documentation.md` - Add documentation
- `.contextkit/commands/quality-check.md` - Quality checks
- `.contextkit/commands/create-component.md` - Create component
- `.contextkit/commands/create-feature.md` - Create feature

### Instructions
- `.contextkit/instructions/meta/pre-flight.md` - Pre-flight checks
- `.contextkit/instructions/meta/post-flight.md` - Post-flight verification
- `.contextkit/instructions/core/auto-corrections-log.md` - Auto-logging instructions

### Templates
- `.contextkit/templates/feature-spec.md`
- `.contextkit/templates/component.md`
- `.contextkit/templates/test.md`
- `.contextkit/templates/story.md`
- `.contextkit/templates/hook.md`
- `.contextkit/templates/api.md`

### Tracking
- `.contextkit/corrections.md` - AI performance corrections log

## Conditional Loading

ContextKit supports conditional loading based on task context:

```markdown
<!-- when:react -->
### React Conventions
Components use PascalCase and named exports.

<!-- when:css -->
### CSS Conventions
Use SCSS modules with BEM naming.

<!-- context-check:general-formatting -->
IF this section already in context:
  SKIP: Re-reading
ELSE:
  READ: The following formatting rules
```

## How to Use

**In Cursor/VS Code:** Everything auto-loads! Just work normally.

**In CLI tools (Claude, Gemini, Codex):**
```bash
# Reference specific files you need:
claude "read .contextkit/standards/glossary.md and create a @btn for @customer login"

# Or reference multiple files:
claude "read .contextkit/standards/README.md .contextkit/standards/glossary.md and create a button"

# Include product context:
claude "read .contextkit/product/mission-lite.md .contextkit/standards/code-style.md and create a feature"
```
