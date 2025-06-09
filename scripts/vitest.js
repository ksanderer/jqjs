#!/usr/bin/env node
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const args = process.argv.slice(2);
let lineIndex = args.indexOf('--line');
let lines = null;
if (lineIndex !== -1) {
  lines = args[lineIndex + 1];
  args.splice(lineIndex, 2);
}
const env = { ...process.env };
if (lines) env.TEST_LINES = lines;

const bin = join(dirname(fileURLToPath(import.meta.url)), '../node_modules/.bin/vitest');
const child = spawn(bin, args, { stdio: 'inherit', env, shell: true });
child.on('exit', (code) => process.exit(code));

