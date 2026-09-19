# @taskflow/math

Deterministic math utilities for TaskFlow engineering challenges.

## PI finite-prefix utility

`calculatePiPrefix(decimalPlaces)` returns the exact finite decimal prefix of π for the requested number of decimal places. It uses Machin's formula with BigInt-scaled integer arithmetic:

```text
π / 4 = 4 arctan(1/5) - arctan(1/239)
```

The utility intentionally returns finite prefixes rather than claiming to emit the complete value of π. The full decimal expansion is infinite and non-repeating, so a finite program can only produce a requested finite prefix.

## Run tests

```bash
npm run test -w packages/math
```
