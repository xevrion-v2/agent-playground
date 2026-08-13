# Infinite Sequence Iterator

A lazy infinite sequence utility with safe iteration examples and documentation.

## Overview

This package provides a composable, lazy way to work with infinite numeric sequences. Values are computed only when requested via JavaScript generators — no arrays are pre-allocated and no infinite loops are possible when using the built-in safe consumption utilities.

## Built-in Sequences

| Sequence | Values | Example |
|----------|--------|---------|
| `naturals(start?)` | 1, 2, 3, 4, ... | `take(naturals(), 5)` → `[1,2,3,4,5]` |
| `evens(start?)` | 0, 2, 4, 6, ... | `take(evens(), 5)` → `[0,2,4,6,8]` |
| `odds()` | 1, 3, 5, 7, ... | `take(odds(), 5)` → `[1,3,5,7,9]` |
| `fibonacci()` | 0, 1, 1, 2, 3, 5, ... | `take(fibonacci(), 7)` → `[0,1,1,2,3,5,8]` |
| `powersOfTwo()` | 1, 2, 4, 8, ... | `take(powersOfTwo(), 5)` → `[1,2,4,8,16]` |
| `powersOf(base)` | 1, b, b², b³, ... | `take(powersOf(3), 5)` → `[1,3,9,27,81]` |
| `arithmetic(start, step)` | start, start+step, ... | `take(arithmetic(5, 3), 4)` → `[5,8,11,14]` |
| `geometric(start, ratio)` | start, start*r, ... | `take(geometric(2, 3), 4)` → `[2,6,18,54]` |
| `primes()` | 2, 3, 5, 7, 11, ... | `take(primes(), 5)` → `[2,3,5,7,11]` |
| `triangular()` | 1, 3, 6, 10, 15, ... | `take(triangular(), 5)` → `[1,3,6,10,15]` |
| `custom(genFn)` | user-defined | see below |

## Safe Consumption Utilities

**These are the primary way to consume infinite sequences safely:**

```js
const { sequence, take, takeWhile, first, nth } = require('./index');

// Get first N values as an array
take(sequence.fibonacci(), 10);  // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

// Get values while a condition holds
takeWhile(sequence.primes(), p => p < 50);  // [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]

// Get the first value
first(sequence.naturals());  // 1

// Get the nth value (0-indexed)
nth(sequence.primes(), 99);  // 541 (the 100th prime)
```

## Chaining: map and filter

Sequences support `.map()` and `.filter()` for lazy transformations:

```js
// Even Fibonacci numbers
const evenFibs = sequence.fibonacci().filter(n => n % 2 === 0);
take(evenFibs, 6);  // [0, 2, 8, 34, 144, 610]

// Squared naturals
const squared = sequence.naturals().map(n => n * n);
take(squared, 5);  // [1, 4, 9, 16, 25]
```

## Custom Sequences

Create any infinite sequence with a generator function:

```js
const collatz = sequence.custom(function* () {
  let n = 27;
  while (true) {
    yield n;
    n = n % 2 === 0 ? n / 2 : 3 * n + 1;
  }
});
take(collatz, 10);  // [27, 82, 41, 124, 62, 31, 94, 47, 142, 71]
```

## Running the Demo

```bash
node index.js
```

## Design Principles

1. **Lazy evaluation** — no values computed until requested
2. **Safe by default** — `take()` and `takeWhile()` prevent infinite loops
3. **Composable** — `.map()` and `.filter()` return new lazy sequences
4. **Iterable protocol** — works with `for...of`, spread, destructuring
5. **No external dependencies** — pure JavaScript, zero deps
