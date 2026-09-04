# `@taskflow/infinite-sequence`

A small, synchronous utility for restartable lazy sequences that do not end on
their own.

```ts
import { infiniteSequence } from "@taskflow/infinite-sequence";

const naturals = infiniteSequence(0, (value) => value + 1);
console.log([...naturals.take(5)]); // [0, 1, 2, 3, 4]
```

Fibonacci numbers can be represented as state pairs:

```ts
const states = infiniteSequence(
  [0, 1] as const,
  ([current, next]) => [next, current + next] as const,
);

for (const [value] of states.take(8)) {
  console.log(value); // 0, 1, 1, 2, 3, 5, 8, 13
}
```

## Safe iteration

Never spread, collect, or exhaust the infinite sequence directly. Calls such as
`[...sequence]` and `Array.from(sequence)` do not terminate. Apply
`.take(nonNegativeSafeInteger)` first.

The bounded view is lazy. It does not open the source for `take(0)`, does not
compute the recurrence past its limit, and calls the source iterator's
`return()` hook when the limit is reached or the consumer stops early. The
sequence stores no history, so recurrence traversal uses O(1) memory.

This package intentionally implements a synchronous `Iterable`. Timeouts,
signals, and async resource cancellation belong in a separate `AsyncIterable`
API.
