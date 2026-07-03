# Infinite Sequence Challenge

This package exposes a small infinite sequence generator and a `take()` helper
so callers can safely consume only a finite prefix.

Why this approach:

- The iterator is tiny and easy to reason about.
- `take()` keeps examples safe by avoiding unbounded loops.
- The behavior is simple to test with fixed expectations.

Example:

```js
import { infiniteSequence, take } from "./src/index.js";

take(infiniteSequence(10, 5), 4);
// [10, 15, 20, 25]
```
