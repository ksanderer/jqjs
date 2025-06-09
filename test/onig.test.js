import { describe, it, expect, afterAll } from 'vitest';
import fs from 'fs';
import { compile } from '../jq.js';

const lines = fs.readFileSync('./test/onig.test', 'utf8').split(/\r?\n/);

function parseTests() {
  let cases = [];
  let i = 0;
  function skip() {
    while (i < lines.length && (lines[i].trim() === '' || lines[i].startsWith('#')))
      i++;
  }
  while (i < lines.length) {
    skip();
    if (i >= lines.length) break;
    const startLine = i + 1;
    if (lines[i] === '%%FAIL') {
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
    cases.push({ prog, input, outputs, line: startLine });
  }
  return cases;
}

let cases = parseTests();
if (process.env.TEST_LINES) {
  const linesWanted = new Set(
    process.env.TEST_LINES.split(',').map((l) => Number(l.trim())).filter(Boolean)
  );
  cases = cases.filter((tc) => linesWanted.has(tc.line));
}

let total = 0;
let passed = 0;

describe('onig.test', () => {
  cases.forEach((tc, idx) => {
    it(`case ${idx + 1}: ${tc.prog}`, (ctx) => {
      total++;
      ctx.onTestFinished((c) => {
        if (c.task.result && c.task.result.state === 'pass') passed++;
      });
      const f = compile(tc.prog);
      const parseInput = (str) => {
        try {
          return JSON.parse(str);
        } catch {
          return new Function('const nan=NaN; return (' + str + ')')();
        }
      };
      const expected = tc.outputs.map(o => JSON.stringify(parseInput(o)));
      const actual = Array.from(f(parseInput(tc.input))).map(v => JSON.stringify(v));
      expect(actual).toEqual(expected);
    });
  });

  afterAll(() => {
    const percent = total ? ((passed / total) * 100).toFixed(1) : '0';
    console.log(`Conformance: ${percent}% (${passed}/${total})`);
  });
});
