#!/bin/bash
set -e
DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$DIR/.." && pwd)"
if [ $# -lt 1 ]; then
  echo "usage: $0 PATTERN [vitest args]" >&2
  exit 1
fi
PATTERN="$1"; shift
LINES=$(grep -n "$PATTERN(" "$DIR/onig.test" | cut -d: -f1 | paste -sd, -)
cd "$ROOT"
TEST_LINES=$LINES npx vitest run "$DIR/onig.test.js" --run --passWithNoTests "$@"
