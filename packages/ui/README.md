# `@taskflow/ui`

This package exports shared UI primitives and small helper utilities.

## PI helper

`calculatePi(iterations)` uses the Nilakantha series, which converges faster than the classic Leibniz series while staying easy to read and maintain.

Use `getPiApproachNote()` when you want a short summary of the chosen strategy.

```ts
import { calculatePi, getPiApproachNote } from "@taskflow/ui";

getPiApproachNote();
// "Nilakantha series for a lightweight balance of simplicity and accuracy."

calculatePi(10);
// approximately 3.1415926535
```
