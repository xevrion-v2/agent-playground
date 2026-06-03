# Pi Calculation Challenge - Mathematical & Algorithmic Explanation

This document details the mathematical logic and implementation of the Pi calculation challenge.

## Mathematical Premise

Pi ($\pi$) is an **irrational** and **transcendental** number. This means:
1. Its decimal representation is infinite.
2. It does not repeat in any periodic pattern.

Consequently, it is mathematically impossible to calculate the "exact value of Pi up to the very last decimal point" because there is no final decimal place. 

However, we can calculate Pi to any arbitrary precision (finite decimal prefix) using efficient algorithms.

## Algorithmic Implementation

We selected **Machin's Formula** for our high-precision Pi calculator:

$$\frac{\pi}{4} = 4 \arctan\left(\frac{1}{5}\right) - \arctan\left(\frac{1}{239}\right)$$

This formula is highly efficient because:
- The argument $\frac{1}{5}$ is relatively small, so its Taylor series converges quickly.
- The term $\arctan\left(\frac{1}{239}\right)$ converges extremely rapidly.

The Taylor series expansion for $\arctan(x)$ is:

$$\arctan(x) = x - \frac{x^3}{3} + \frac{x^5}{5} - \frac{x^7}{7} + \dots$$

### BigInt Arithmetic in Node.js

Since JavaScript's standard `Number` type only provides double-precision floating-point numbers (approx. 15-17 decimal digits), we use native JavaScript `BigInt` to handle arbitrary precision integers.

We scale all fractions by $10^{precision}$ so we can perform integer divisions without losing decimal places.

## Usage

To calculate Pi to any arbitrary number of digits (e.g. 1000 digits):

```bash
node scripts/calculate-pi.js 1000
```
