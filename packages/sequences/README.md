# @taskflow/sequences

Infinite sequence iterators for the TaskFlow monorepo.

## Available Sequences

| Sequence | Description | First 10 values |
|----------|-------------|-----------------|
| `fibonacciSequence()` | Fibonacci numbers | 0, 1, 1, 2, 3, 5, 8, 13, 21, 34 |
| `naturalNumbers(start?)` | Natural numbers from start | 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 |
| `powersOfTwo()` | Powers of 2 | 1, 2, 4, 8, 16, 32, 64, 128, 256, 512 |
| `primeNumbers()` | Prime numbers | 2, 3, 5, 7, 11, 13, 17, 19, 23, 29 |

## Safe Consumption

Always use `take()` or `takeWhile()` to consume infinite sequences:

```typescript
import { fibonacciSequence, take, takeWhile } from '@taskflow/sequences';

// Take first 10
const first10 = take(fibonacciSequence(), 10);

// Take while less than 100
const under100 = takeWhile(fibonacciSequence(), n => n < 100);
```
