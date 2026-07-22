# PI Calculation

This script calculates the mathematical constant PI (pi) using the Leibniz formula:

```
pi/4 = 1 - 1/3 + 1/5 - 1/7 + 1/9 - ...
```

## Approach

The Leibniz formula is an infinite series that converges to pi/4. By iterating through N terms, we can approximate pi to varying degrees of accuracy.

## Usage

```bash
python scripts/calculate_pi.py
```

## Accuracy

With 1,000,000 terms, the approximation matches the true value of pi to approximately 5 decimal places.
