/attempt #17

### Implementation Plan
- Use the **Chudnovsky algorithm** (currently the fastest algorithm for calculating Pi) to compute Pi to high precision (thousands of decimal places).
- Implement using TypeScript's `BigInt` for arbitrary-precision arithmetic to avoid floating point limitations.
- Implement Newton's method for the integer square roots required by the formula.
- Document the mathematical proof that computing the *exact* (infinite) value of Pi in finite space is impossible, but provide a function that calculates it exactly to any requested `n` digits.
- Provide a visual demo recording of the calculation executing.
