# @agent-playground/utils

A collection of utility functions for the Agent Playground project.

## InfiniteSequence

A safe and flexible utility for creating and iterating over infinite sequences.

### Features

- **Safety**: Built-in iteration limits prevent accidental infinite loops
- **Lazy evaluation**: Values are generated on-demand
- **Composable**: Supports `map` and `filter` operations
- **Type-safe**: Fully typed with TypeScript generics

### Installation

```bash
npm install @agent-playground/utils
```

### Usage

#### Basic Example

```typescript
import { InfiniteSequence } from '@agent-playground/utils';

// Create an infinite sequence of natural numbers
const naturals = new InfiniteSequence<number>((prev) => (prev ?? 0) + 1);

// Safely take the first 5 values
const firstFive = naturals.take(5);
console.log(firstFive); // [1, 2, 3, 4, 5]
```

#### Using Helper Functions

```typescript
import { naturalNumbers, repeat, generate } from '@agent-playground/utils';

// Natural numbers starting from 1
const nums = naturalNumbers();
console.log(nums.take(3)); // [1, 2, 3]

// Repeat a value
const ones = repeat(1);
console.log(ones.take(3)); // [1, 1, 1]

// Generate from a function
const squares = generate((i) => (i + 1) ** 2);
console.log(squares.take(4)); // [1, 4, 9, 16]
```

#### Safe Iteration with for...of

```typescript
const seq = new InfiniteSequence<number>((prev) => (prev ?? 0) + 1, {
  maxIterations: 100, // Safety limit
});

for (const value of seq) {
  console.log(value);
  if (value > 10) break; // Always break manually!
}
```

#### Transformation and Filtering

```typescript
const naturals = new InfiniteSequence<number>((prev) => (prev ?? 0) + 1);

// Map: double each value
const doubled = naturals.map((x) => x * 2);
console.log(doubled.take(3)); // [2, 4, 6]

// Filter: get only even numbers
const evens = naturals.filter((x) => x % 2 === 0);
console.log(evens.take(3)); // [2, 4, 6]
```

### API Reference

#### `InfiniteSequence<T>`

| Method | Description |
|--------|-------------|
| `take(count)` | Returns the first `count` values as an array |
| `map(fn)` | Returns a new InfiniteSequence with transformed values |
| `filter(predicate)` | Returns a new InfiniteSequence with filtered values |

#### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `maxIterations` | `number` | `1,000,000` | Maximum iterations before throwing |
| `throwOnLimit` | `boolean` | `true` | Whether to throw when limit is reached |

### License

MIT
