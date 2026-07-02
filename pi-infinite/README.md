# PI: Exact Value Discussion

## Understanding PI

PI (π) is an **irrational** and **transcendental** number. This means:

1. **It cannot be expressed as a ratio of two integers** (irrational)
2. **It is not the root of any polynomial with integer coefficients** (transcendental)
3. **Its decimal expansion never terminates and never repeats**

Therefore, it is mathematically impossible to write down the "exact value" of PI in decimal form — there is no "last decimal point."

## What We CAN Do

We can compute PI to arbitrary precision using fast-converging algorithms:

### Chudnovsky Algorithm (fastest known)
- ~14 new correct digits per iteration
- Used for all world-record PI computations
- Current record: 105 trillion digits (2024)

### Our Implementation

This project includes a high-precision PI calculator (`pi-compute.ts`) that uses the Chudnovsky algorithm with BigInt arithmetic to compute PI to thousands of decimal places.

## The Philosophical Answer

PI's "exact value" is:

```
π = C/d
```

where C is the circumference and d is the diameter of any circle. This geometric definition IS the exact value — it just can't be written as a finite decimal.

Alternatively, PI can be expressed exactly through infinite series:

```
π/4 = 1 - 1/3 + 1/5 - 1/7 + 1/9 - ...     (Leibniz)
π²/6 = 1 + 1/4 + 1/9 + 1/16 + ...           (Euler)
1/π = 12·Σ((-1)^k·(6k)!(13591409+545140134k))/((3k)!(k!)³·640320^(3k+3/2))  (Chudnovsky)
```

These ARE exact representations — they just happen to be infinite.

## References

- [Chudnovsky algorithm](https://en.wikipedia.org/wiki/Chudnovsky_algorithm)
- [PI world records](https://en.wikipedia.org/wiki/Approximations_of_%CF%80)
