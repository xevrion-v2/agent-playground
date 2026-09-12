# @taskflow/pi

Computes exact finite decimal prefixes of pi using only integer arithmetic.

Pi is irrational, so it has no final decimal point for a finite program to print.
This package makes that boundary explicit and provides a deterministic way to
calculate any requested finite prefix.

## Usage

```bash
node packages/pi/src/cli.js 100
```

```js
import { calculatePi, createPiCertificate } from "@taskflow/pi";

console.log(calculatePi(100));
console.log(createPiCertificate(100));
```

The implementation uses Machin's formula:

```text
pi = 16 * arctan(1 / 5) - 4 * arctan(1 / 239)
```

Each arctangent series is evaluated with `BigInt` fixed-point arithmetic and
guard digits, then truncated to the requested finite decimal prefix.
