/**
 * Examples demonstrating safe usage of infinite sequence iterators.
 * Run with: npx tsx src/examples.ts
 */
import {
  naturals, fibonacci, primes, iterate, cycle, generate,
  take, takeWhile, drop, filter, map, reduce, zip
} from "./index";

console.log("=== Infinite Sequence Iterator - Examples ===\n");

// Natural numbers
console.log("First 10 naturals:", take(10, naturals()));
console.log("Naturals from 5:", take(5, naturals(5)));

// Fibonacci
console.log("\nFirst 10 Fibonacci:", take(10, fibonacci()));
console.log("Fibonacci < 100:", takeWhile(x => x < 100, fibonacci()));

// Primes
console.log("\nFirst 10 primes:", take(10, primes()));

// Iterate (powers of 2)
console.log("\nPowers of 2:", take(8, iterate(x => x * 2, 1)));

// Cycle
console.log("\nCycle [a,b,c]:", take(7, cycle(["a", "b", "c"])));

// Generate (squares)
console.log("\nSquares:", take(6, generate(i => i * i)));

// Safe consumption patterns
console.log("\n=== Safe Iteration Patterns ===\n");

console.log("First 5 even naturals:", filter(x => x % 2 === 0, 5, naturals()));
console.log("Squares of 1-5:", map(x => x * x, 5, naturals(1)));
console.log("Skip 10, take 5:", drop(10, 5, naturals()));
console.log("Sum of 1-100:", reduce((acc, x) => acc + x, 0, 100, naturals(1)));
console.log("Zip naturals+fib:", zip(5, naturals(), fibonacci()));

console.log("\n✅ All examples completed safely - no infinite loops!");
