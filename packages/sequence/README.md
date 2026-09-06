# TaskFlow Sequence Utilities

This package provides small, dependency-free helpers for infinite sequences.

Use `takeFromSequence` to consume a bounded number of values so examples and
tests cannot accidentally run forever.

```ts
import { fibonacciSequence, naturalNumbers, takeFromSequence } from "@taskflow/sequence";

const firstFiveNaturalNumbers = takeFromSequence(naturalNumbers(), 5);
const firstSevenFibonacciNumbers = takeFromSequence(fibonacciSequence(), 7);
```

Custom recurrence examples can use `infiniteSequence` directly:

```ts
import { infiniteSequence, takeFromSequence } from "@taskflow/sequence";

const powersOfTwo = infiniteSequence(1, (value) => value * 2);
const firstFour = takeFromSequence(powersOfTwo, 4);
```
