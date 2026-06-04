# @taskflow/math

TaskFlow mathematical and algorithmic utilities.

## High-Precision PI Calculation

This package implements an exact arbitrary-precision PI calculation utility using the **Spigot streaming algorithm** (Gibbons, 2005) powered by JavaScript's native `BigInt` arithmetic.

### On the "Exact/Final" Digit of PI

In mathematics, $\pi$ is proven to be **irrational** (Lambert, 1761) and **transcendental** (Lindemann, 1882). 

This means:
1. It cannot be expressed as a simple fraction $a/b$.
2. Its decimal representation is **infinite** and **never repeats**.
3. Consequently, **there is no "very last" decimal digit of $\pi$**. 

Any computer program operating in finite memory can only ever output a finite prefix of $\pi$. Our implementation allows you to calculate this finite decimal prefix exactly to any arbitrary number of digits $N$.

### API Usage

```typescript
import { calculatePi } from "@taskflow/math";

// Calculate PI to 100 decimal places
const piString = calculatePi(100);
console.log(piString);
// Output: 3.1415926535...
```
