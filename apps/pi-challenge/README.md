# PI Calculation Challenge

A lightweight math challenge that calculates π using four different algorithms and compares their accuracy and convergence speed.

## Algorithms

| Algorithm | Convergence | Digits/term |
|-----------|------------|-------------|
| Leibniz formula | Slow | ~0.3 |
| Nilakantha series | Moderate | ~1.0 |
| Machin's formula | Fast | ~1.4 |
| Gauss-Legendre | Quadratic | ~doubles each iteration |

### Approach

1. **Leibniz formula** — `π/4 = 1 - 1/3 + 1/5 - 1/7 + ...`  
   Simple alternating series. Included as a baseline to show how slowly basic methods converge.

2. **Nilakantha series** — `π = 3 + 4/(2·3·4) - 4/(4·5·6) + ...`  
   Faster convergence than Leibniz, still simple to implement.

3. **Machin's formula** — `π/4 = 4·arctan(1/5) - arctan(1/239)`  
   Uses the atan Taylor series with arguments that converge quickly. Reaches float64 precision (~15 digits) in ~10 terms.

4. **Gauss-Legendre algorithm**  
   Quadratic convergence: each iteration roughly doubles the number of correct digits. Reaches float64 limit in just 3 iterations.

## Running

```bash
node index.js
```

## Results Summary

- Machin's formula and Gauss-Legendre both reach JavaScript's float64 precision limit (~15-16 digits) in very few iterations
- The Gauss-Legendre algorithm achieves this in just 3 iterations (quadratic convergence)
- Machin's formula achieves this in ~10 terms (linear convergence)
- For true arbitrary precision, one would need BigInt-based arithmetic (not shown here)
