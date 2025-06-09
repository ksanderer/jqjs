#!/usr/bin/env bash
set -e
DIR="$(cd "$(dirname "$0")" && cd .. && pwd)"
TEST_DIR="$DIR/test"

for file in "$TEST_DIR"/*.test.js; do
  echo "## Running $(basename "$file")"
  npx vitest run "$file" --run --coverage --passWithNoTests "$@"
  echo
done
