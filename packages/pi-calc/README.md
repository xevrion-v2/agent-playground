# @agent-playground/pi-calc

High-precision PI calculation using the Chudnovsky algorithm with BigInt arbitrary-precision arithmetic.

## Algorithm

The **Chudnovsky algorithm** converges at ~14 digits per term, making it the fastest known algorithm for PI computation:

```
1/π = 12 * Σ ((-1)^k * (6k)! * (13591409 + 545140134k)) / ((3k)! * (k!)^3 * 640320^(3k + 3/2))
```

## Usage

```typescript
import { calculatePi } from "@agent-playground/pi-calc";

// Calculate PI to 100 decimal places
const pi = calculatePi(100);
console.log(pi);
// 3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679
```

## CLI

```bash
npm run demo -w @agent-playground/pi-calc -- 1000
```

## Why PI Cannot Be Calculated Exactly

PI is an **irrational number** with an infinite, non-repeating decimal expansion. It is mathematically impossible to compute PI "to the very last decimal point" because there is no last decimal point.

This package calculates PI to **any requested finite precision** using exact integer arithmetic (BigInt), ensuring no floating-point rounding errors.

## Tests

```bash
npm test -w @agent-playground/pi-calc
```
