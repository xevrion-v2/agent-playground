# @taskflow/sequence

Dependency-free infinite sequence helpers for TypeScript/JavaScript.

## API

- `sequence(seed, step)` — generic infinite generator
- `take(iter, n)` — first n elements
- `takeWhile(iter, pred)` — elements while predicate holds
- `collect(iter, n?)` — materialise to array

### Pre-built sequences

| Function | Description |
|---|---|
| `naturals(start?)` | 0, 1, 2, 3, … |
| `arithmetic(a, d)` | a, a+d, a+2d, … |
| `fibonacci()` | 0, 1, 1, 2, 3, 5, 8, … |
| `recurrence(init, step)` | Generic linear recurrence |

## Usage

```ts
import { fibonacci, take, collect } from "@taskflow/sequence";

const first10 = collect(take(fibonacci(), 10));
// [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

## Test

```bash
npm test --workspace @taskflow/sequence
```
