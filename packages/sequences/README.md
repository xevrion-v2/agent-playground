# Infinite Sequence Utility

Safe helpers for working with infinite iterables:

- `infiniteSequence(start, step)` — lazy generator
- `take(iterable, count)` — bounded collection helper
- `naturals()` — convenience wrapper starting at 1

## Example

```ts
import { naturals, take } from "@taskflow/sequences/infinite";

const firstTen = take(naturals(), 10);
```

## Run tests

```bash
npm test -w packages/sequences
```
