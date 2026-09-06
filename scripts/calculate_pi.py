#!/usr/bin/env python3
"""Calculate PI using Leibniz formula with configurable precision."""
def calc_pi(terms: int = 1000000) -> float:
    pi = 0.0
    for i in range(terms):
        pi += (1 if i % 2 == 0 else -1) / (2 * i + 1)
    return pi * 4
if __name__ == "__main__":
    for t in [10, 100, 1000, 10000, 100000, 1000000]:
        a = calc_pi(t)
        print(f"Terms: {t:>8d}  PI: {a:.10f}  Error: {abs(a - 3.141592653589793):.10f}")
