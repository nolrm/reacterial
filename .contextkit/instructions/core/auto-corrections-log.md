---
description: Automatic Corrections Log Updates for ContextKit Performance Tracking
globs:
alwaysApply: true
version: 1.0
encoding: UTF-8
---

# Automatic Corrections Log Updates

## Overview

Automatically track and log ContextKit performance issues during development sessions to continuously improve AI assistant effectiveness.

## Automatic Triggers

### During Development Sessions

**Standards Violations** - Automatically log when:

- AI doesn't follow ContextKit testing standards initially
- AI doesn't apply coding standards without prompting
- AI misses established patterns or conventions

**Inefficient Behavior** - Automatically log when:

- AI requires multiple iterations for simple tasks
- AI needs user guidance on basic concepts
- AI makes repeated mistakes in the same session

**Positive Behaviors** - Automatically log when:

- AI proactively applies ContextKit standards
- AI correctly identifies issues or patterns
- AI solves problems efficiently on first attempt

### Update Process

1. **Session Review**: At the end of each development session, review for ContextKit performance patterns
2. **Automatic Logging**: Update `.contextkit/corrections.md` without prompting
3. **Categorization**: Classify issues as Rule Updates, AI Behavior, or Preferences
4. **Trend Tracking**: Note frequency and patterns for continuous improvement

### Implementation

- **No User Prompt Required**: This happens automatically as part of the workflow
- **Real-time Updates**: Log issues as they're discovered during development
- **Pattern Recognition**: Track recurring issues to identify systemic problems
- **Positive Reinforcement**: Document good behaviors to reinforce them

## Example Automatic Updates

### Standards Violation

```
- Testing | AI didn't follow ContextKit testing standards initially [HIGH]
  [Context: Had to correct AI to use numbered test cases]
```

### Inefficient Behavior

```
- TypeScript | AI needed multiple iterations to fix type errors [MEDIUM]
  [Context: Required guidance on enum types and const assertions]
```

### Positive Behavior

```
- Testing | AI correctly identified potential bug during testing [LOW]
  [Context: Good behavior - documented finding]
```

## Benefits

- **Continuous Improvement**: Automatically identify and fix ContextKit performance issues
- **No Manual Overhead**: Eliminates need for user prompts to track issues
- **Pattern Recognition**: Build up data on recurring problems
- **Standards Enforcement**: Ensure ContextKit standards are consistently applied
