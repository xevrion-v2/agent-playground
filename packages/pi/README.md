# PI Prefix Utilities

This package answers issue #17 by generating exact finite prefixes of PI with integer arithmetic.

PI has no final decimal digit, so no finite program can print "the very last decimal point".
What this package can do is compute a reproducible prefix with any requested finite number of
decimal places and return a certificate that another process can verify.

## Example

```js
import { certifyPiPrefix } from "@taskflow/pi";

const certificate = certifyPiPrefix(100);
console.log(certificate.prefix);
console.log(certificate.sha256);
```

The implementation uses Machin's identity:

```text
pi / 4 = 4 * arctan(1 / 5) - arctan(1 / 239)
```

Each arctangent series term is evaluated as a scaled integer using `BigInt`, avoiding floating
point rounding errors.
