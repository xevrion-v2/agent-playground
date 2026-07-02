# π Calculator

Exact π calculation using the Machin-like formula with arbitrary-precision BigInt arithmetic in JavaScript.

## Formula

```
π/4 = 4 * arctan(1/5) - arctan(1/239)
```

Where `arctan(x)` is computed using the Taylor series:

```
arctan(x) = x - x³/3 + x⁵/5 - x⁷/7 + ...
```

This identity (known as Machin's formula) converges at roughly 1.4 decimal digits per term. All arithmetic uses JavaScript `BigInt` for exact integer representation.

## Usage

```bash
# Default: 100 digits
node src/cli.js

# Custom digits
node src/cli.js 500
node src/cli.js 1000
node src/cli.js 5000

# Run tests
node src/test.js
```

## Performance

| Digits | Time (approx) |
|--------|--------------|
| 100    | <1ms         |
| 1,000  | ~5ms         |
| 5,000  | ~250ms       |
| 10,000 | ~2s          |

## "Exact" π

π is a transcendental number (proved by Lindemann in 1882), meaning it has no finite decimal representation. This utility computes π to **any finite number of digits** the user requests, limited only by available memory. The result is exact up to the requested number of decimal places.

## Verification

The first 100 digits match the known verified value from NIST and OEIS A000796:

```
3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679
```
