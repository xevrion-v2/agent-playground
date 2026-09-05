# @taskflow/pi

`@taskflow/pi` calculates exact finite decimal prefixes of pi with dependency-free
BigInt integer arithmetic.

The issue asks for the exact value of pi to the last decimal point. Pi has an
infinite, non-repeating decimal expansion, so there is no final decimal digit for
a finite program to print. This package makes the practical target explicit:
request `n` digits after the decimal point and receive the exact finite prefix.

## Algorithm

The implementation uses Machin's formula:

```text
pi = 16 * atan(1 / 5) - 4 * atan(1 / 239)
```

Each arctangent series is evaluated with scaled BigInt integer arithmetic and
guard digits. The final output is truncated to the requested prefix length,
which avoids floating point rounding drift.

## Usage

```js
import { calculatePiPrefix, createPiCertificate } from "@taskflow/pi";

console.log(calculatePiPrefix(100));
console.log(createPiCertificate(100).sha256);
```

## Validation

```bash
npm test -w packages/pi
```

