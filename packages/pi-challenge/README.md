# PI Challenge

This package computes an approximation of PI using the Nilakantha series.

Why this approach:

- The implementation is small.
- It converges faster than the simplest alternating series.
- It is easy to test with a bounded iteration count.

Example:

```js
import { calculatePi } from "./src/index.js";

calculatePi(5000);
```
