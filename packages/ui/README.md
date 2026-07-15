# `@taskflow/ui`

This package exports the shared UI primitive set plus a small infinite sequence helper for bounded iteration examples.

## Infinite sequence helper

`infiniteSequence(start, step)` yields an endless numeric progression.
Pair it with `take(iterable, count)` when you want a safe, finite slice.

```ts
import { infiniteSequence, take } from "@taskflow/ui";

take(infiniteSequence(1, 2), 4);
// [1, 3, 5, 7]
```

```ts
take(infiniteSequence(), 3);
// [0, 1, 2]
```
