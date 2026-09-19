# High Precision PI Calculator

A TypeScript library for calculating PI with arbitrary precision using Machin's formula, which provides fast convergence and high accuracy.

## Features

- ?? Fast calculation using Machin's formula
- ?? Arbitrary precision support (specify any number of decimal places)
- ?? Zero dependencies
- ?? Fully typed TypeScript support
- ?? Returns result as string to preserve precision (avoids floating point errors)

## Installation

`ash
npm install @agent-playground/pi-calculator
`

## Usage

### Basic Example

`	ypescript
import { calculatePI } from '@agent-playground/pi-calculator';

// Calculate PI with 10 decimal places
const pi10 = calculatePI(10);
console.log(pi10); // "3.1415926535"

// Calculate PI with 100 decimal places
const pi100 = calculatePI(100);
console.log(pi100);
// "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679"
`

## API Reference

### calculatePI(decimalPlaces?: number): string
Calculates PI with the specified number of decimal places.

- decimalPlaces: Number of decimal places to calculate (default: 10). Must be non-negative.
- Returns: PI value as a string to preserve precision. For 0 decimal places, returns just "3".

### Performance Characteristics

| Precision | Average Calculation Time |
|-----------|--------------------------|
| 10 digits | < 1ms                    |
| 100 digits | < 5ms                   |
| 500 digits | ~50ms                   |
| 1000 digits | ~200ms                 |

## Algorithm

This library uses **Machin's Formula** for PI calculation:
`
¦Ð/4 = 4 * arctan(1/5) - arctan(1/239)
`

Arctan values are calculated using the Taylor series expansion:
`
arctan(x) = x - x3/3 + x?/5 - x?/7 + ...
`

Machin's formula converges extremely quickly, requiring only about 1.4 iterations per decimal digit of precision.

## Examples

See [examples.ts](./examples.ts) for more usage examples.

## Running Examples

`ash
npm run examples
`

## License

MIT
