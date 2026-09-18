# PI Stream

Dependency-free Node utility for calculating exact finite decimal prefixes of
pi with BigInt arithmetic.

The issue asks for the "exact value of PI" to the last decimal point. Pi has an
infinite non-repeating decimal expansion, so no finite program can emit a final
decimal digit. This package computes exact finite prefixes for any requested
precision within runtime and memory limits.

## Run

```bash
npm run demo -w @agent-playground/pi-stream -- 100
```

The optional second argument controls demo line width:

```bash
npm run demo -w @agent-playground/pi-stream -- 1000 100
```

## Test

```bash
npm test -w @agent-playground/pi-stream
```

## API

```js
import { calculatePiPrefix, formatPiChunks } from "@agent-playground/pi-stream"

const pi = calculatePiPrefix(100)
console.log(formatPiChunks(pi, { lineWidth: 80 }))
```

## Algorithm

`calculatePiPrefix(decimalDigits)` uses the Chudnovsky series with binary
splitting. Each term contributes roughly 14 decimal digits, and all arithmetic is
integer-only through `BigInt`. A guard precision is computed and trimmed so the
returned string is the exact prefix for the requested finite precision.
