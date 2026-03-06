---
description: Common Post-Flight Steps for ContextKit Instructions
globs:
alwaysApply: false
version: 1.0
encoding: UTF-8
---

# Post-Flight Rules

After completing all steps in a process_flow, always review your work and verify:

- Every numbered step has read, executed, and delivered according to its instructions.

- All steps that specified a subagent should be used, did in fact delegate those tasks to the specified subagent. IF they did not, see why the subagent was not used and report your findings to the user.

- IF you notice a step wasn't executed according to it's instructions, report your findings and explain which part of the instructions were misread or skipped and why.

## Automatic Corrections Log Updates

After completing any development session, automatically update the corrections log if any of the following occurred:

### ContextKit Performance Issues

- **Standards Violations**: If you didn't follow ContextKit standards initially (testing, coding, etc.)
- **Inefficient Behavior**: If you required multiple iterations for simple tasks
- **Missing Context**: If you needed user guidance on established patterns
- **Rule Gaps**: If you discovered gaps in ContextKit rules or instructions

### Positive Behaviors

- **Good Practices**: If you correctly identified issues or followed best practices
- **Efficient Solutions**: If you solved problems quickly and effectively
- **Standards Compliance**: If you proactively applied ContextKit standards

### Update Process

1. **Identify Issues**: Review the session for ContextKit performance patterns
2. **Categorize**: Classify as Rule Updates, AI Behavior, or Preferences
3. **Update Log**: Add entries to `.contextkit/corrections.md` automatically
4. **No Prompt Required**: This should happen as part of the natural workflow

### Example Triggers

- ✅ User had to correct you on testing standards → Add to corrections log
- ✅ You needed multiple attempts to fix TypeScript errors → Add to corrections log
- ✅ You correctly identified a code issue → Add positive behavior note
- ✅ You followed ContextKit standards from the start → Add positive behavior note
