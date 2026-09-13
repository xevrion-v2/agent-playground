# PI Calculation Challenge

Deterministic, dependency-free PI calculation for the TaskFlow engineering
playground.

## Algorithm

Machin's formula (1706):

```
pi = 16 * arctan(1/5) - 4 * arctan(1/239)
```

with the Taylor series `arctan(1/x) = Σ (-1)^k / ((2k+1) * x^(2k+1))`.
All math is `BigInt` fixed-point arithmetic: the series runs until its tail
can no longer change the integer result, so the output is an exact
truncation of pi to the requested number of decimal places. No floating
point is involved, so results are identical on every machine and every run.

## How to run

```bash
# print pi to 100 decimal places (matches the challenge's reference value)
node src/pi.mjs 100

# run the verification checks (requires no dependencies, no install step)
node test/verify.mjs
```

Requires Node.js >= 20 (uses native `BigInt` and ES modules).

## About "the very last decimal point"

The challenge text asks for pi "up to the very last decimal point".
That digit does not exist: pi was proven irrational (Lambert, 1761) and
transcendental (Lindemann, 1882), so its decimal expansion is infinite and
non-repeating. The honest, well-defined goal is therefore *pi truncated to
N decimal places for an arbitrary, finite N* — which is exactly what this
implementation provides. `computePi(N)` returns the same first N digits
that any reference value of pi provides, verifiable against published
digit sequences.
