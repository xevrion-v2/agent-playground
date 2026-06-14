# Infinite Sequence Utility

TaskFlow's engineering playground includes a dependency-free infinite sequence helper in `scripts/infinite-sequence.mjs`.

Use `sequence(seed, next)` to define deterministic unbounded iterators, then consume them with `take(iterable, count)` so examples and tests always stop at a known limit.

```js
import { naturalNumbers, take } from "../scripts/infinite-sequence.mjs";

const firstFive = take(naturalNumbers(1), 5);
// [1, 2, 3, 4, 5]
```

The module also includes `fibonacci()` as a safe example of an infinite recurrence.

Run the coverage with:

```sh
npm test
```
