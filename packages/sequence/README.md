# Infinite sequence utility

`infiniteSequence(seed, next)` creates a lazy sequence that can continue indefinitely. Because the iterator has no natural end, consume it with a bounded helper such as `take()`.

```ts
import { infiniteSequence, take } from "./src/index";

const naturals = infiniteSequence(0, (value) => value + 1);
console.log(take(naturals, 5)); // [0, 1, 2, 3, 4]

const powersOfTwo = infiniteSequence(1, (value) => value * 2);
console.log(take(powersOfTwo, 6)); // [1, 2, 4, 8, 16, 32]
```

`take(source, count)` stops after the requested number of values and validates that `count` is a non-negative integer. This makes examples and callers explicit about how much of an infinite sequence they intend to consume.
