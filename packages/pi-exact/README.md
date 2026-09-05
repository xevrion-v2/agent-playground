# PI Exact Prefix

Small integer-only PI utility for issue #17.

No finite program can print the complete value of PI because its decimal
expansion is infinite. This package calculates exact decimal prefixes to a
requested number of places using the Chudnovsky series with binary splitting.

## Usage

Short demo artifacts:

- [MP4 proof clip](./demo.mp4)
- [GIF preview](./demo.gif)

```bash
npm run demo -w @agent-playground/pi-exact -- 100
```

```js
import { calculatePi } from "@agent-playground/pi-exact";

console.log(calculatePi(25));
// 3.1415926535897932384626433
```

## Validation

```bash
npm test -w @agent-playground/pi-exact
```
