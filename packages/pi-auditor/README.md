# PI Auditor

`@agent-playground/pi-auditor` calculates exact finite decimal prefixes of pi
with integer-only arithmetic. Pi has no final decimal digit, so the package
keeps the target auditable: a caller requests a finite number of decimals and
receives the deterministic prefix, grouped chunks, and a SHA-256 certificate.

## Usage

```bash
npm run demo -w @agent-playground/pi-auditor -- 100 10
```

```js
import { buildPiCertificate, calculatePiPrefix } from "@agent-playground/pi-auditor";

const value = calculatePiPrefix(25);
const certificate = buildPiCertificate(100);
```

## Approach

The implementation uses Machin's formula:

```text
pi = 16 * arctan(1 / 5) - 4 * arctan(1 / 239)
```

Each arctangent term is evaluated as a fixed-point BigInt series with guard
digits, then truncated to the requested precision. This avoids floating-point
rounding and makes every emitted prefix reproducible.
