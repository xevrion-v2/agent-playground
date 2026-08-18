# @taskflow/utils

Shared utility functions for TaskFlow.

## InfiniteSequence

An infinite arithmetic sequence generator with safe iteration utilities.

### Basic Usage

```typescript
import { InfiniteSequence } from "@taskflow/utils";

// Create a sequence: 0, 1, 2, 3, 4, ...
const seq = new InfiniteSequence();

// Custom start and step: 10, 15, 20, 25, ...
const seq2 = new InfiniteSequence(10, 5);
```

### Safe Iteration

```typescript
// Take first n elements
seq.take(5); // [0, 1, 2, 3, 4]

// Iterate with a limit
seq.iterate(3); // [0, 1, 2]

// Find first matching element (with safety limit)
seq.find((x) => x > 100); // 101

// Skip first n elements
seq.skip(5).take(3); // [5, 6, 7]

// Filter with limit
seq.filter((x) => x % 2 === 0, 5); // [0, 2, 4, 6, 8]
```

### Factory Functions

```typescript
import { naturalNumbers, evenNumbers, oddNumbers } from "@taskflow/utils";

naturalNumbers().take(5); // [0, 1, 2, 3, 4]
evenNumbers().take(4);    // [0, 2, 4, 6]
oddNumbers().take(4);     // [1, 3, 5, 7]
```

### Safety Guarantees

- All bounded operations (`take`, `find`, `iterate`, `filter`, `skip`) have
  explicit limits to prevent infinite loops.
- `find()` throws an `Error` if the predicate is not satisfied within
  `maxIterations` (default: 10,000).
- Direct iteration via `for...of` is infinite — always use a `break` or
  bounded method.

## Development

```bash
npm run test -w packages/utils
```
