# @taskflow/pi-spigot

`@taskflow/pi-spigot` is a dependency-free PI digit stream for the
TaskFlow playground. It emits the decimal expansion one digit at a time with
BigInt integer state instead of using floating point arithmetic or a
precomputed constant.

PI has no final decimal digit, so this package answers the finite, verifiable
version of issue #17: produce the exact prefix for a requested number of
decimal places and include enough metadata to audit that prefix.

## Usage

```bash
npm run demo -w @taskflow/pi-spigot -- 100
```

Example output starts with the issue's known 100-digit prefix:

```text
3.1415926535 8979323846 2643383279 5028841971 6939937510 5820974944 5923078164
0628620899 8628034825 3421170679

digits_after_decimal=100
algorithm=unbounded-spigot-bigint
```

Programmatic API:

```js
import { createPiCertificate, piDecimalWindow, piPrefix } from "@taskflow/pi-spigot";

console.log(piPrefix(25));
console.log(piDecimalWindow(10, 10));
console.log(createPiCertificate(100));
```

## Validation

```bash
npm test -w @taskflow/pi-spigot
```

The tests verify the first 100 decimal places from issue #17, the digit stream
order, decimal window extraction, certificate metadata, formatting, and input
validation.
