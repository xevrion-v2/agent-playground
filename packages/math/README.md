# TaskFlow Math Challenges

## PI calculation

`calculatePi()` uses the Gauss-Legendre algorithm. It starts with arithmetic and geometric means, then repeatedly refines both values while applying a correction term. The method has quadratic convergence, so each iteration rapidly increases the number of correct digits.

The default of three iterations is intentionally small and is enough to reach JavaScript `number` precision for PI within the package test tolerance.

```ts
import { calculatePi } from "./src/pi";

console.log(calculatePi());
```

Pass a positive integer to explore the convergence behavior, for example `calculatePi(1)` or `calculatePi(3)`.
