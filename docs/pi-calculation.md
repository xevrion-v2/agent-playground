# PI Calculation Approach

`scripts/calculate-pi.mjs` computes decimal digits of PI with Machin's formula:

```text
pi = 16 * arctan(1 / 5) - 4 * arctan(1 / 239)
```

The implementation uses BigInt fixed-point arithmetic and a small guard precision so the final string can be returned without floating-point rounding errors.

Example:

```powershell
node scripts/calculate-pi.mjs 100
```

The script is intentionally lightweight and dependency-free. It is suitable for deterministic local checks and educational algorithm examples, not for claiming that PI has a final decimal digit.
