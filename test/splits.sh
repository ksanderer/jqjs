#!/bin/bash
DIR="$(cd "$(dirname "$0")" && pwd)"
"$DIR/run_regex.sh" splits "$@"
