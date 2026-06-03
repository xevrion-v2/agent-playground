# PI calculation challenge

Issue #17 asks for the exact value of pi through the final decimal place. There is no final decimal place: pi is irrational, so its decimal expansion is infinite and non-repeating. Any finite string of digits can be exact only as a prefix of pi, not as the complete decimal expansion.

This submission therefore handles the challenge in the only mathematically correct way:

1. It states why an exact terminal decimal value cannot exist.
2. It provides a deterministic arbitrary-precision digit generator for any requested finite prefix.
3. It avoids pretending that a finite repository change can discover a last digit that pi does not have.

The included `scripts/pi.js` implementation uses Machin's formula:

```text
pi = 16 * arctan(1/5) - 4 * arctan(1/239)
```

The arctangent series is evaluated with `BigInt` fixed-point arithmetic and guard digits, then truncated back to the requested finite prefix. This gives a practical way to extend the repository's current 100-digit prefix to any finite number of decimal places that the runtime can reasonably compute.

Example:

```bash
node scripts/pi.js 100
```

Output:

```text
3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679
```

That matches the 100 decimal places listed in the issue. Running the same script with a larger integer requests a longer finite prefix. The complete value of pi remains an infinite decimal expansion, so the honest answer to the bounty's literal wording is that the requested "very last decimal point" does not exist.
