# Infinite Sequence Utilities

A TypeScript library providing various infinite sequence generators and safe iteration utilities.

## Features

- ?? Multiple built-in infinite sequence generators
- ??? Safe iteration helpers to avoid infinite loops
- ?? Zero dependencies
- ?? Fully typed TypeScript support

## Installation

`ash
npm install @agent-playground/sequence-utils
`

## Usage

### Basic Example

`	ypescript
import { naturalNumbers, fibonacci, take } from '@agent-playground/sequence-utils';

// Get first 10 natural numbers
const first10Numbers = take(naturalNumbers(), 10);
console.log(first10Numbers); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// Get first 15 Fibonacci numbers
const first15Fibs = take(fibonacci(), 15);
console.log(first15Fibs); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377]
`

## API Reference

### Generators

#### 
aturalNumbers(start?: number, step?: number): Generator<number>
Creates an infinite sequence of natural numbers.
- start: Starting number (default: 0)
- step: Step between numbers (default: 1)

#### ibonacci(): Generator<number>
Creates an infinite Fibonacci sequence (0, 1, 1, 2, 3, 5, 8, ...).

#### evenNumbers(start?: number): Generator<number>
Creates an infinite sequence of even numbers.
- start: Starting even number (default: 0)

#### oddNumbers(start?: number): Generator<number>
Creates an infinite sequence of odd numbers.
- start: Starting odd number (default: 1)

#### constant<T>(value: T): Generator<T>
Creates an infinite sequence that repeats the same value.

#### iterate<T>(initial: T, nextFunction: (current: T) => T): Generator<T>
Creates an infinite sequence by repeatedly applying a function to the previous value.

### Safe Iteration Helpers

#### 	ake<T>(iterator: Generator<T>, count: number): T[]
Safely takes the first count elements from an iterator. Returns an array of the taken elements.

#### 	akeWhile<T>(iterator: Generator<T>, predicate: (value: T) => boolean): T[]
Takes elements from the iterator while the predicate function returns true.

## Examples

See [examples.ts](./examples.ts) for more usage examples.

## Running Examples

`ash
npm run examples
`

## License

MIT
