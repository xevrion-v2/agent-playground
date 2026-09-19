# @taskflow/pi-bbp-verifier

Dependency-free finite prefix calculator for pi.

This package does not claim to emit an infinite "final digit" of pi. Instead,
it computes exact requested decimal prefixes with integer-only Machin arithmetic
and produces an independent hexadecimal BBP prefix check.

## Usage

```bash
node packages/pi-bbp-verifier/src/cli.mjs 100 32
```

The command prints a JSON certificate containing:

- requested decimal digit count
- requested BBP hexadecimal digit count
- decimal prefix
- hexadecimal BBP prefix
- SHA-256 checksum of the certificate payload

## Tests

```bash
node --test packages/pi-bbp-verifier/test/*.test.mjs
```

The tests verify the known 100-digit decimal prefix and known hexadecimal BBP
prefixes beginning with `243F6A8885A308D3`.
