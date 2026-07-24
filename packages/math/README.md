# PI Calculation Challenge

Deterministic PI estimate using the Leibniz series:

```
PI ≈ 4 * (1 - 1/3 + 1/5 - 1/7 + ...)
```

## Run

```bash
npm test -w packages/math
```

## Notes

- `estimatePi(iterations)` throws on non-positive iteration counts.
- `estimatePiDefault()` uses 10,000 iterations (~0.01 absolute error).
