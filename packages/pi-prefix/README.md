# @taskflow/pi-prefix

Calculates exact finite decimal prefixes of pi with integer-only BigInt
arithmetic.

Pi does not have a final decimal point, so no finite program can print its
complete infinite expansion. This package makes the practical target explicit:
given a requested number of decimal places, it returns the exact finite prefix
for that precision.

## Usage

```js
import { calculatePiPrefix, createPiCertificate } from "@taskflow/pi-prefix";

console.log(calculatePiPrefix(10));
console.log(createPiCertificate(100));
```

## Demo

```sh
npm run demo -w @taskflow/pi-prefix -- 100
```

The demo prints the requested finite prefix plus a SHA-256 certificate that can
be used to compare generated output across environments.
