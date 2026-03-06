#!/bin/bash
# ContextKit AI CLI wrapper
# Usage: .contextkit/scripts/ai-cli.sh "your prompt"

CONTEXT_FILE=".contextkit/context.md"
AI_TOOL="${AI_TOOL:-aider}"
PROMPT="$@"

if [ ! -f "$CONTEXT_FILE" ]; then
  echo "❌ ContextKit not initialized. Run: contextkit install"
  exit 1
fi

CONTEXT=$(cat "$CONTEXT_FILE")

case "$AI_TOOL" in
  "aider")
    echo "$PROMPT" | aider
    ;;
  "claude")
    echo "$CONTEXT

User: $PROMPT" | claude
    ;;
  *)
    echo "$CONTEXT

User: $PROMPT"
    ;;
esac
