# @taskflow/math

Mathematical utilities for the TaskFlow monorepo.

## PI Calculation

Three algorithms for calculating PI:

1. **Bailey-Borwein-Plouffe (BBP)** - Fast convergence, ~1.2 digits per iteration
2. **Leibniz** - Simple but slow convergence
3. **Nilakantha** - Faster convergence than Leibniz

### Usage

```typescript
import { calculatePI_BBP, calculatePI_Leibniz, calculatePI_Nilakantha } from '@taskflow/math';

const pi_bbp = calculatePI_BBP(1000);        // Fast, accurate
const pi_leibniz = calculatePI_Leibniz(1000000); // Slow but simple
const pi_nilakantha = calculatePI_Nilakantha(100); // Good balance
```
