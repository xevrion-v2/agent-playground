#!/usr/bin/env python3
"""Calculate PI using the Leibniz formula: pi/4 = 1 - 1/3 + 1/5 - 1/7 + ..."""

def calculate_pi(terms: int = 1000000) -> float:
    pi = 0.0
    for i in range(terms):
        pi += (4.0 if i % 2 == 0 else -4.0) / (2 * i + 1)
    return pi

if __name__ == '__main__':
    pi = calculate_pi()
    print(f"Calculated PI ({1000000} terms): {pi}")
    print(f"Reference PI:              3.14159265358979323846")
    print(f"Difference:                {abs(pi - 3.14159265358979323846)}")
