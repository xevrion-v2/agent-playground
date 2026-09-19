# `@taskflow/pi`

Utilities for computing exact finite decimal prefixes of pi.

Pi has an infinite non-repeating decimal expansion, so there is no final
decimal point for a finite program to return. This package instead computes
deterministic truncated prefixes with integer arithmetic.

## Usage

```js
import { calculatePiPrefix } from "@taskflow/pi";

console.log(calculatePiPrefix(100));
```

## Validation

```sh
npm run test -w packages/pi
```
