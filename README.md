# agent-playground

A small monorepo for focused coding tasks and experiments.

## Infinite sequence utility

This repository now includes a tiny infinite sequence helper in `packages/infinite-sequence`.

It exposes:

- `infiniteSequence(start = 0, step = 1)` - returns an infinite iterator of numbers
- `take(iterable, count)` - safely collects a fixed number of values from any iterable

Example:

```js
const { infiniteSequence, take } = require("./packages/infinite-sequence");

const sequence = infiniteSequence(10, 5);

console.log(take(sequence, 4));
// [10, 15, 20, 25]
```

Safe iteration with `for...of`:

```js
const { infiniteSequence } = require("./packages/infinite-sequence");

let seen = 0;
for (const value of infiniteSequence(1, 1)) {
  console.log(value);
  seen += 1;

  if (seen === 3) {
    break;
  }
}
```

Avoid spreading an infinite iterator directly, and prefer `take()` or an explicit `break` condition when consuming values.
