# PI Calculator

A high-precision PI calculation library implementing multiple algorithms for calculating PI to arbitrary precision.

## Algorithms Implemented

### 1. Chudnovsky Algorithm
The fastest known algorithm for calculating PI. Uses the formula:
```
1/π = 12 * Σ ((-1)^k * (6k)! * (13591409 + 545140134k)) / ((3k)! * (k!)^3 * 640320^(3k))
```

### 2. Bailey-Borwein-Plouffe (BBP) Formula
Allows calculating individual hexadecimal digits of PI without computing preceding digits:
```
π = Σ (1/16^k) * (4/(8k+1) - 2/(8k+4) - 1/(8k+5) - 1/(8k+6))
```

### 3. Leibniz Formula
Simple but slow convergence:
```
π/4 = 1 - 1/3 + 1/5 - 1/7 + 1/9 - ...
```

### 4. Machin Formula
Fast convergence using arctangent:
```
π/4 = 4*arctan(1/5) - arctan(1/239)
```

## Usage

```typescript
import { calculatePiChudnovsky, getPi, verifyPi } from './pi-calculator';

// Calculate PI to 100 decimal places
const pi100 = calculatePiChudnovsky(100);
console.log(pi100);
// Output: 3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679

// Get pre-computed PI for common cases
const pi50 = getPi(50);
console.log(pi50);
// Output: 3.14159265358979323846264338327950288419716939937510

// Verify PI calculation
const verification = verifyPi('3.1415926535', '3.1415926535');
console.log(verification);
// Output: { isCorrect: true, matchingDigits: 11, totalDigits: 11 }
```

## Testing

```bash
npm test
```

## Performance

| Algorithm | Digits | Time Complexity | Notes |
|-----------|--------|-----------------|-------|
| Chudnovsky | 1000+ | O(n log(n)^3) | Fastest for large precision |
| BBP | Any | O(n) | Can compute individual hex digits |
| Leibniz | <100 | O(n) | Simple but slow convergence |
| Machin | 1000+ | O(n) | Good balance of speed and simplicity |

## References

- [Chudnovsky Algorithm](https://en.wikipedia.org/wiki/Chudnovsky_algorithm)
- [BBP Formula](https://en.wikipedia.org/wiki/Baily%E2%80%93Borwein%E2%80%93Plouffe_formula)
- [Leibniz Formula](https://en.wikipedia.org/wiki/Leibniz_formula_for_%CF%80)
- [Machin Formula](https://en.wikipedia.org/wiki/Machin-like_formula)

## License

MIT
