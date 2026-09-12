# @taskflow/pi

A high-precision arbitrary-digit Pi calculator using Machin's arctangent formula implemented with pure JavaScript BigInt arithmetic.

## Mathematical Principle

Machin's formula is an extremely efficient formula for calculating the value of $\pi$:

$$ \frac{\pi}{4} = 4 \arctan\left(\frac{1}{5}\right) - \arctan\left(\frac{1}{239}\right) $$

We compute the $\arctan(x)$ terms using their Taylor series expansion scaled by $10^{D + G}$ where $D$ is the requested decimal precision and $G$ represents the guard digits to guarantee accuracy.

### The "Very Last Decimal Point" Limitation

As Pi is an **irrational** and **transcendental** number, its decimal expansion is infinite and never repeating. Consequently, there is no mathematical "last decimal point" of Pi. This package calculates the exact finite prefix of Pi to any requested number of digits.

## Usage

### Run CLI Demo

Calculate Pi up to 100 decimal places:

```bash
node src/cli.js 100
```

### Run Tests

Run the test suite using Node's native test runner:

```bash
npm run test
```
