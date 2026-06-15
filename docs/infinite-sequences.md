# Infinite Sequence Utility

`scripts/infinite-sequence.mjs` exports two small helpers:

- `infiniteSequence(start, step)` creates a lazy numeric sequence.
- `take(sequence, count)` safely reads a finite number of values.

The sequence itself does not terminate, so callers should always consume it with a limit.

```js
import { infiniteSequence, take } from "../scripts/infinite-sequence.mjs";

const naturalNumbers = infiniteSequence(1, 1);
const firstFive = take(naturalNumbers, 5);

console.log(firstFive); // [1, 2, 3, 4, 5]
```

Use `take` or another bounded iterator consumer to avoid accidental infinite loops.
