# TaskFlow Math Utilities

This package contains small dependency-free algorithm examples.

## PI Estimation

`estimatePi()` uses the Nilakantha series:

```text
3 + 4/(2*3*4) - 4/(4*5*6) + 4/(6*7*8) ...
```

The approach is intentionally lightweight and readable. It is not the fastest way to compute PI, but it demonstrates a converging algorithm and includes tests that show accuracy improves as more terms are used.

```js
import { formatPiEstimate } from "@taskflow/math";

console.log(formatPiEstimate(1000, 5)); // 3.14159
```
