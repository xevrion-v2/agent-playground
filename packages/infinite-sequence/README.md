# @taskflow/infinite-sequence

A lightweight infinite numeric sequence iterator with safe bounded consumption via `take()`.

## Usage

```js
const { infiniteSequence, take } = require('@taskflow/infinite-sequence');

// Generate the first 10 natural numbers
const naturals = take(infiniteSequence(1, 1), 10);
// => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// Generate even numbers
const evens = take(infiniteSequence(0, 2), 5);
// => [0, 2, 4, 6, 8]
```

## Safe Iteration Patterns

Since the sequence is infinite, **always** use `take()` or a manual break condition to avoid unbounded iteration.
