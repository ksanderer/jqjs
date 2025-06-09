jqjs is a JavaScript implementation of the jq query language. It implements the core language features in pure JavaScript.

The main entry point to jqjs is the compile function, which turns a jq program string into a generator function:

```
import jq from './jq.js'
let filter = jq.compile(".x[].y")
for (let v of filter({x:[{y:2}, {y:4}]}) { ... }
The module also has a prettyPrint function for rendering an object to text.
```

## Goals

Our goal is to pushing the conformnace tests to 100%.

## Testing

We have a conformance file `jq.test` wihich is orginial tests from C jq repo (https://github.com/jqlang/jq/blob/master/tests/jq.test). Assume this tests are correct. NEVER change the file, if you see a test error, OUR CODE IS THE SOURCE OF THE PROBLEM.

You can run all test:
```
npx vitest run test/jq.test.js --run
```

Or tests on a particular lines:
```
TEST_LINES=72,86,90,94,98 npx vitest run test/jq.test.js --run --passWithNoTests
```

Typical test usage example will look like:
```
TEST_LINES=1142,1158,1168,1172,1765,1769,1773,1777,1781,1785,1789,1815,1819,1823,1827,1831,1836,1844,1848,1849 npx vitest run test/jq.test.js --run --passWithNoTests > /tmp/test.log && tail -n 20 /tmp/test.log
```
