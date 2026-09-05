# @taskflow/pi-prefix

Computes exact finite decimal prefixes of PI with dependency-free BigInt
integer arithmetic.

PI has no final decimal point, so a finite program cannot emit the entire
infinite expansion. This package provides the practical piece: exact prefixes
to a requested number of decimal places.

```sh
npm run demo -w @taskflow/pi-prefix
```

```js
import { calculatePi } from "@taskflow/pi-prefix";

console.log(calculatePi(25));
// 3.1415926535897932384626433
```
