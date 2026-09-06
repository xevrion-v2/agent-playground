# TaskFlow Sequence Utilities

Small dependency-free helpers for safe infinite sequence examples.

## Usage

```js
import { infiniteSequence, naturals, take, takeFibonacci } from "@taskflow/sequence";

take(naturals(), 5);
// [0, 1, 2, 3, 4]

take(infiniteSequence({ start: 1, step: 2 }), 4);
// [1, 3, 5, 7]

takeFibonacci(7);
// [0, 1, 1, 2, 3, 5, 8]
```

Infinite iterators never finish on their own. Always consume them with `take()` or another bounded loop.
