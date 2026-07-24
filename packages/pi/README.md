# TaskFlow PI Utility

This package provides a deterministic PI prefix calculator for the internal
engineering playground challenge.

PI has no final decimal point, so a finite program cannot print the complete
decimal expansion. The useful engineering target is an exact finite prefix:
given `n`, calculate the first `n` digits after the decimal point with integer
arithmetic and reproducible validation.

## Usage

```sh
npm run demo -w @taskflow/pi -- 100
```

## Validation

```sh
npm test -w @taskflow/pi
```

