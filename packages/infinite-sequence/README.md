# infinite-sequence

A tiny utility for creating infinite numeric sequences with safe consumption patterns.

## API

### `infiniteSequence(start = 0, step = 1)`

Creates an iterable that yields numbers forever.

```js
const { infiniteSequence } = require("./index");

const sequence = infiniteSequence(0, 2);
```

### `take(iterable, count)`

Collects a fixed number of values from an iterable.

```js
const { infiniteSequence, take } = require("./index");

console.log(take(infiniteSequence(3, 3), 5));
// [3, 6, 9, 12, 15]
```

## Safe iteration examples

Use `take()` when you need a bounded list:

```js
const { infiniteSequence, take } = require("./index");

const firstTen = take(infiniteSequence(1, 1), 10);
console.log(firstTen);
```

Use `break` when iterating manually:

```js
const { infiniteSequence } = require("./index");

let count = 0;
for (const value of infiniteSequence(5, 5)) {
  console.log(value);
  count += 1;

  if (count === 4) {
    break;
  }
}
```

Do not spread an infinite iterable directly:

```js
// Avoid this:
// [...infiniteSequence()]
```
