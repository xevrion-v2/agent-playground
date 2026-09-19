# Pi Prefix

This package addresses issue #17 by producing finite decimal prefixes of pi with
deterministic integer arithmetic. It avoids floating point math entirely, so the
output is stable across platforms and can be audited with the included SHA-256
certificate helper.

## Usage

```bash
npm run test -w @taskflow/pi-prefix
node packages/pi-prefix/src/cli.js 100 --chunk-size 20
node packages/pi-prefix/src/cli.js 100 --json
```

## Approach

The calculator uses Machin's formula:

```text
pi = 4 * (4 * arctan(1 / 5) - arctan(1 / 239))
```

Each arctangent series is evaluated with `BigInt` at the requested precision
plus guard digits, then truncated to the requested finite prefix. The package
also exposes chunking and certificate helpers so a UI, API, or review script can
display and verify the generated prefix without recalculating it.

## Example

```bash
$ node packages/pi-prefix/src/cli.js 25
3.1415926535897932384626433
digits: 26
fractional_digits: 25
sha256: 6e172c87859b68e34a43da05bcd32dba137c66c93dd8a735124a7d6202de83fc
known_100_digit_prefix_verified: true
```
