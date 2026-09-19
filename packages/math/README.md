# @taskflow/math

Mathematical utilities for the TaskFlow monorepo.

## PI Calculation

Implements exact PI calculation to arbitrary precision using BigInt arithmetic.

### Functions

- `calculatePIExact(digits)` - Calculate PI to N decimal places using BBP formula
- `calculatePI_Machin(digits)` - Calculate PI using Machin's formula (verification)
- `getPI100()` - Get PI to 100 decimal places
- `getPI1000()` - Get PI to 1000 decimal places
- `verifyPI(digits)` - Cross-validate between algorithms

### Usage

```typescript
import { calculatePIExact, getPI100 } from '@taskflow/math';

const pi100 = getPI100();
const pi500 = calculatePIExact(500);
```
