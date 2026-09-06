# @taskflow/sequences

Small utilities for building infinite sequences without accidentally consuming
them forever.

## Safe Iteration

Always pair an infinite sequence with a finite consumer such as `take`.

```ts
import { fibonacci, naturals, take } from "@taskflow/sequences";

const firstFiveTaskIds = take(naturals(1), 5);
// [1, 2, 3, 4, 5]

const firstSevenFibonacciValues = take(fibonacci(), 7);
// [0n, 1n, 1n, 2n, 3n, 5n, 8n]
```

## Custom Sequences

Use `infiniteSequence` when each value can be derived from the previous value.

```ts
import { infiniteSequence, take } from "@taskflow/sequences";

const powersOfTwo = infiniteSequence(1, (value) => value * 2);
const sample = take(powersOfTwo, 6);
// [1, 2, 4, 8, 16, 32]
```

`take` validates its count and stops after the requested number of values, so
callers do not need to manually break out of a `for...of` loop.
