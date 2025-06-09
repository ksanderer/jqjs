import { describe, it, expect, afterAll } from 'vitest';
import fs from 'fs';
import { compile } from '../jq.js';

// Parse jq.test file
const lines = fs.readFileSync('./jq.test', 'utf8').split(/\r?\n/);
function parseTests() {
  let cases = [];
  let i = 0;
  function skip() {
    while (i < lines.length && (lines[i].trim() === '' || lines[i].startsWith('#'))) i++;
  }
  while (i < lines.length) {
    skip();
    if (i >= lines.length) break;
    if (lines[i] === '%%FAIL') {
      // skip failing tests
      i++;
      while (i < lines.length && lines[i].trim() !== '') i++;
      continue;
    }
    const prog = lines[i++];
    skip();
    const input = lines[i++] ?? 'null';
    skip();
    const outputs = [];
    while (i < lines.length && lines[i].trim() !== '' && !lines[i].startsWith('#')) {
      outputs.push(lines[i++]);
    }
    cases.push({ prog, input, outputs });
  }
  return cases;
}
const cases = parseTests();

let total = 0;
let passed = 0;

describe('jq.test', () => {
  cases.forEach((tc, idx) => {
    it(`case ${idx + 1}: ${tc.prog}`, (ctx) => {
      total++;
      ctx.onTestFinished((c) => {
        if (c.task.result && c.task.result.state === 'pass') passed++;
      });
      const f = compile(tc.prog);
      const actual = Array.from(f(JSON.parse(tc.input))).map(v => JSON.stringify(v));
      expect(actual).toEqual(tc.outputs);
    });
  });

  afterAll(() => {
    const percent = total ? ((passed / total) * 100).toFixed(1) : '0';
    console.log(`Conformance: ${percent}% (${passed}/${total})`);
  });
});
