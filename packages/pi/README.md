# @taskflow/pi — High-Precision PI Calculator

Compute exact finite decimal prefixes of π using the **Chudnovsky algorithm** with binary splitting, implemented in pure JavaScript with BigInt integer arithmetic.

## Why this package?

The original issue (#17) asks to "calculate the exact value of PI". Since π is **irrational**, its decimal expansion never terminates. This package computes the **exact finite prefix** to any requested precision, verified by an independent BBP hex-digit extraction cross-check.

## Features

- ✅ **Chudnovsky binary splitting** — O(n·log²n) complexity via BigInt
- ✅ **BBP hex-digit verification** — independent cross-check of hex digits
- ✅ **SHA-256 certificate** — each computed prefix is checksummed
- ✅ **Chunked certificates** — verify any 50-digit segment independently
- ✅ **CLI tool** — compute π from the command line
- ✅ **Deterministic** — same digits input always produces same output

## Usage

### Programmatic API

```js
import { computePi, verifyPi, bbpHexDigit } from "@taskflow/pi";

// Compute π to 100 decimal places
const { pi, certificate } = computePi(100);
console.log(pi);
// → "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679"

// Verify against known reference
const result = verifyPi(pi, 100);
console.log(result.valid); // → true

// Certificate includes SHA-256 hash for verification
console.log(certificate.sha256);
// → "e5d2b4c8..."

// Independent BBP hex-digit check
console.log(bbpHexDigit(0)); // → 3 (first hex digit)
```

### CLI

```bash
# Compute π to 100 decimal places
node src/cli.mjs 100

# Output as JSON certificate
node src/cli.mjs 100 --json

# Verify a π string against reference
node src/cli.mjs verify "3.14159" 5
```

## Tests

```bash
node --test test/pi.test.mjs
```

## Algorithm

The **Chudnovsky algorithm** (1994) is currently the fastest known algorithm for computing π:

```
π = (426880 · √10005) / Σ_{k=0}^{∞} s(k)
s(k) = (6k)! · (545140134k + 13591409) / ((3k)! · (k!)³ · (-262537412640768000)^k)
```

Binary splitting groups terms into a binary tree to reduce BigInt multiplications from O(n²) to O(n·log²n).

The **BBP formula** (Bailey–Borwein–Plouffe, 1997) computes individual hexadecimal digits of π without computing preceding digits, providing an independent verification path.

## Mathematical Note

π is a transcendental irrational number — its decimal expansion is infinite and non-repeating. No finite computation can produce "all" digits of π. This package computes exact finite prefixes to any requested precision using exact integer arithmetic.