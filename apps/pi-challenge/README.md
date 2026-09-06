# PI Challenge

Calculates π using the **Nilakantha series**, which converges more quickly than the basic Leibniz formula.

## Algorithm

```
π = 3 + 4/(2·3·4) - 4/(4·5·6) + 4/(6·7·8) - ...
```

## Usage

```bash
node apps/pi-challenge/index.js
PI_ITERATIONS=5000 node apps/pi-challenge/index.js
```

## Why Nilakantha?

The Leibniz series adds terms of the form `(-1)^n / (2n+1)`, which converges very slowly. Nilakantha's series has cubic denominator terms, yielding much better accuracy with fewer iterations.
