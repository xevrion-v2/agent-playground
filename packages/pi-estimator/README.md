# TaskFlow PI Estimator

This package uses the Nilakantha series as a lightweight PI algorithm example.

The series starts at `3` and alternates fractional terms:

```text
pi = 3 + 4/(2*3*4) - 4/(4*5*6) + 4/(6*7*8) - ...
```

It is dependency-free, easy to explain, and shows better accuracy as more terms
are evaluated.

```ts
import { estimatePi, formatPi } from "@taskflow/pi-estimator";

const estimate = estimatePi(1000);
const rounded = formatPi(estimate, 6);
```
