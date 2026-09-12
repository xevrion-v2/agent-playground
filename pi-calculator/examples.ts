import { calculatePI } from './index';

console.log("=== High Precision PI Calculator Examples ===\n");

// Example 1: Default precision (10 decimal places)
console.log("1. PI with 10 decimal places:");
console.log(calculatePI(10)); // 3.1415926535
console.log();

// Example 2: 20 decimal places
console.log("2. PI with 20 decimal places:");
console.log(calculatePI(20)); // 3.14159265358979323846
console.log();

// Example 3: 50 decimal places
console.log("3. PI with 50 decimal places:");
console.log(calculatePI(50));
// 3.14159265358979323846264338327950288419716939937510
console.log();

// Example 4: 100 decimal places
console.log("4. PI with 100 decimal places:");
console.log(calculatePI(100));
// 3.14159265358979323846264338327950288419716939937510
// 58209749445923078164062862089986280348253421170679
console.log();

// Example 5: 0 decimal places (just integer part)
console.log("5. PI with 0 decimal places:");
console.log(calculatePI(0)); // 3
console.log();

// Example 6: Performance test - calculate 200 decimal places
console.log("6. PI with 200 decimal places (performance test):");
const startTime = Date.now();
const pi200 = calculatePI(200);
const endTime = Date.now();
console.log(pi200);
console.log(Calculated in ms);
