# Pi Boundary

`@taskflow/pi-boundary` solves the usable version of issue #17:
compute exact finite decimal prefixes of pi while explicitly documenting that
pi has no final decimal digit.

The implementation uses Machin's formula with integer-only BigInt fixed-point
arithmetic:

```text
pi = 16 * arctan(1/5) - 4 * arctan(1/239)
```

No floating point arithmetic is used for the prefix itself.

## Usage

```bash
npm run demo -w @taskflow/pi-boundary
node packages/pi-boundary/src/cli.js 100 --chunk-size 10
node packages/pi-boundary/src/cli.js 1000 --chunk-size 25 --json
```

Example output:

```text
pi prefix (100 fractional digits)
3.1415926535 8979323846 2643383279 5028841971 6939937510 5820974944 5923078164 0628620899 8628034825 3421170679
```

## Verification

```bash
npm run test -w @taskflow/pi-boundary
```

The tests verify:

- the known 100-digit prefix,
- shorter finite prefixes,
- deterministic SHA-256 certificate generation,
- output chunking,
- invalid input handling,
- and the no-final-digit boundary note.

## Demo Artifact

`demo/pi-boundary-demo.mp4` is a short terminal-style demo generated from the
CLI output. It shows a 100-digit run, the SHA-256 certificate, and the explicit
boundary statement.

## Boundary

The bounty title asks for pi "up to the very last decimal point." That literal
target is impossible because pi is irrational. This package returns exact finite
prefixes for a requested number of fractional digits and makes that limitation
clear in both the API and CLI.
