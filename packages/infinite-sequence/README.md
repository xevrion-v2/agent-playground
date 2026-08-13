# Infinite Sequence Iterator

A TypeScript utility for creating and safely consuming infinite sequences using JavaScript generators.

## Features

- **Infinite Generators**: `naturals`, `fibonacci`, `primes`, `iterate`, `cycle`, `generate`
- **Safe Consumption**: `take`, `takeWhile`, `drop`, `filter`, `map`, `reduce`, `zip`
- **Type-safe**: Full TypeScript generics support
- **Zero dependencies**: Pure TypeScript implementation

## Installation

```bash
npm install
```

## Usage

### Basic Sequences

```typescript
import { naturals, fibonacci, primes, take, takeWhile } from "./src";

// First 10 natural numbers
take(10, naturals());       // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// First 8 Fibonacci numbers
take(8, fibonacci());       // [0, 1, 1, 2, 3, 5, 8, 13]

// First 5 prime numbers
take(5, primes());          // [2, 3, 5, 7, 11]
```

### Custom Sequences

```typescript
import { iterate, cycle, generate, take } from "./src";

// Powers of 2
take(6, iterate(x => x * 2, 1));  // [1, 2, 4, 8, 16, 32]

// Cycling values
take(7, cycle(["a", "b", "c"]));   // ["a", "b", "c", "a", "b", "c", "a"]

// Generated sequence
take(5, generate(i => i * i));      // [0, 1, 4, 9, 16]
```

### Safe Iteration

All consumption functions include built-in limits to prevent infinite loops:

```typescript
import { naturals, fibonacci, takeWhile, filter, map, drop, reduce, zip } from "./src";

// Take while condition holds
takeWhile(x => x < 50, fibonacci());  // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

// Filter with limit (get first 5 even naturals)
filter(x => x % 2 === 0, 5, naturals());  // [0, 2, 4, 6, 8]

// Map with limit
map(x => x * x, 5, naturals(1));  // [1, 4, 9, 16, 25]

// Skip first 10, then take 5
drop(10, 5, naturals());  // [10, 11, 12, 13, 14]

// Sum first 100 naturals
reduce((acc, x) => acc + x, 0, 100, naturals(1));  // 5050

// Zip two sequences
zip(5, naturals(), fibonacci());  // [[0,0], [1,1], [2,1], [3,2], [4,3]]
```

## Safety

Every consumption function requires an explicit limit parameter, making it **impossible to accidentally iterate forever**. The generators themselves are infinite, but you always control how many elements to consume.

## API Reference

### Generators (Infinite)

| Function | Description |
|----------|-------------|
| `naturals(start?)` | Natural numbers from `start` (default 0) |
| `fibonacci()` | Fibonacci sequence |
| `primes()` | Prime numbers |
| `iterate(fn, seed)` | Repeated function application |
| `cycle(values)` | Cycles through array values |
| `generate(fn)` | Index-based generation |

### Consumers (Safe)

| Function | Description |
|----------|-------------|
| `take(n, iter)` | First n elements |
| `takeWhile(pred, iter)` | Elements while predicate holds |
| `drop(n, limit, iter)` | Skip n, then take up to limit |
| `filter(pred, limit, iter)` | Filter with max results |
| `map(fn, limit, iter)` | Transform with max results |
| `reduce(fn, init, limit, iter)` | Fold with max iterations |
| `zip(limit, iterA, iterB)` | Pair elements with max pairs |

## License

MIT
