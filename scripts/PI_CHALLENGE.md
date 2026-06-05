# PI Calculation Challenge

This folder contains a deterministic implementation of the **Spigot Algorithm** for calculating the digits of PI to arbitrary precision.

## Algorithm: Rabinowitz-Wagon Spigot Algorithm

Unlike traditional methods (e.g., Machin-like formulas, infinite series), which require floating-point arithmetic libraries to maintain high precision, the Spigot algorithm operates purely using integer arithmetic. 

Key advantages:
- Generates digits one by one.
- Requires no large float division.
- Highly deterministic and lightweight.

## Running the Challenge

To run the calculation locally:

```bash
# Calculate to 100 digits (default)
python scripts/calculate_pi.py

# Calculate to a custom number of digits (e.g., 500)
python scripts/calculate_pi.py 500
```
