# PI Prefix Utility

This workspace package computes exact finite decimal prefixes of PI using
integer-only Machin arctangent arithmetic.

PI has no final decimal digit because it is irrational. This package does not
claim to emit the infinite expansion. It emits exact finite prefixes for a
requested number of fractional digits and provides a small certificate so the
output can be audited without pasting long digit strings into a pull request.

## Commands

Print the first 20 fractional digits:

```sh
npm run demo -w packages/pi -- 20
```

Print the same prefix through the chunked path:

```sh
npm run demo -w packages/pi -- 20 5
```

Print a review certificate with digit count, chunk count, first/last digits, and
a SHA-256 hash of the complete finite prefix:

```sh
npm run demo -w packages/pi -- 100 25 --certificate
```

Run the tests:

```sh
npm run test -w packages/pi
```
