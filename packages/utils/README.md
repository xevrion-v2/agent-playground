# @taskflow/utils — Utilities

## Infinite Sequence Iterator

A lazy, memory-safe infinite sequence utility for TypeScript.

Elements are computed **on demand** — the generator function is called
only when you access an element, so you can chain operations
indefinitely without allocating.

### Quick start

```ts
import { naturals, fibonacci, range, constant, cycle } from "@taskflow/utils";

// Take the first 5 natural numbers
naturals().take(5);    // [0, 1, 2, 3, 4]

// Fibonacci
fibonacci().take(8);   // [0, 1, 1, 2, 3, 5, 8, 13]

// Arithmetic progression
range(10, -1).take(5); // [10, 9, 8, 7, 6]

// Repeating values
cycle("a", "b").take(4); // ["a", "b", "a", "b"]
constant(42).take(3);     // [42, 42, 42]
```

### Chaining

```ts
import { naturals } from "@taskflow/utils";

// Even numbers
naturals().map((n) => n * 2).take(5); // [0, 2, 4, 6, 8]

// Squares
naturals().map((n) => n * n).take(4); // [0, 1, 4, 9]
```

### Reduce & Filter (safe)

```ts
import { naturals } from "@taskflow/utils";

// Sum of first 10 numbers
naturals().reduce((acc, n) => acc + n, 0, 10); // 45

// Filter with safety bounds
const first5Evens = naturals().filter(
  (n) => n % 2 === 0,
  { maxResults: 5 }
); // [0, 2, 4, 6, 8]
```

### Custom sequences

```ts
import { InfiniteSequence } from "@taskflow/utils";

// Prime generator (simple trial division)
const primes = new InfiniteSequence((i) => {
  const candidates = naturals().filter(
    (n) => n > 1 && naturals()
      .take(Math.floor(Math.sqrt(n)) + 1)
      .slice(2)
      .every((d) => n % d !== 0),
    { maxResults: i + 1 }
  );
  return candidates[i];
});

// From a seed (powers of 2)
const powersOf2 = InfiniteSequence.fromSeed(1, (n) => n * 2);
powersOf2.take(6); // [1, 2, 4, 8, 16, 32]
```

### Safety guarantees

| Operation | Always terminates? | Notes |
|-----------|--------------------|-------|
| `take(n)` | ✅ Yes | O(n) |
| `at(n)` | ✅ Yes | O(1) |
| `map(fn)` | ✅ Yes | Returns lazy sequence |
| `filter(pred)` | ✅ Yes | Returns finite array via `maxResults` guard |
| `reduce(fn, init, n)` | ✅ Yes | Processes exactly n elements |
| `zip(other)` | ✅ Yes | Returns lazy sequence |
