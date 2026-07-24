import { naturalNumbers, fibonacci, evenNumbers, oddNumbers, constant, iterate, take, takeWhile } from './index';

console.log("=== Infinite Sequence Utilities Examples ===\n");

// Example 1: Natural numbers
console.log("1. First 10 natural numbers:");
console.log(take(naturalNumbers(), 10)); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log();

// Example 2: Natural numbers starting from 5 with step 2
console.log("2. First 8 natural numbers starting from 5 with step 2:");
console.log(take(naturalNumbers(5, 2), 8)); // [5, 7, 9, 11, 13, 15, 17, 19]
console.log();

// Example 3: Fibonacci sequence
console.log("3. First 15 Fibonacci numbers:");
console.log(take(fibonacci(), 15)); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377]
console.log();

// Example 4: Even numbers
console.log("4. First 10 even numbers starting from 10:");
console.log(take(evenNumbers(10), 10)); // [10, 12, 14, 16, 18, 20, 22, 24, 26, 28]
console.log();

// Example 5: Odd numbers
console.log("5. First 10 odd numbers starting from 3:");
console.log(take(oddNumbers(3), 10)); // [3, 5, 7, 9, 11, 13, 15, 17, 19, 21]
console.log();

// Example 6: Constant sequence
console.log("6. First 5 elements of constant sequence 'hello':");
console.log(take(constant('hello'), 5)); // ['hello', 'hello', 'hello', 'hello', 'hello']
console.log();

// Example 7: Iterate function (powers of 2)
console.log("7. First 10 powers of 2:");
console.log(take(iterate(1, n => n * 2), 10)); // [1, 2, 4, 8, 16, 32, 64, 128, 256, 512]
console.log();

// Example 8: takeWhile (natural numbers less than 20)
console.log("8. Natural numbers less than 20:");
console.log(takeWhile(naturalNumbers(), n => n < 20)); // [0, 1, 2, ..., 19]
console.log();

// Example 9: takeWhile (Fibonacci numbers less than 1000)
console.log("9. Fibonacci numbers less than 1000:");
console.log(takeWhile(fibonacci(), n => n < 1000));
console.log();

// Example 10: Combined usage (filter even Fibonacci numbers)
console.log("10. First 10 even Fibonacci numbers:");
const evenFibs = function*() {
  for (const num of fibonacci()) {
    if (num % 2 === 0) yield num;
  }
};
console.log(take(evenFibs(), 10)); // [0, 2, 8, 34, 144, 610, 2584, 10946, 46368, 196418]
