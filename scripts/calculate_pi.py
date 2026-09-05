#!/usr/bin/env python3
"""Calculate PI using the Gauss-Legendre algorithm (100 decimal places)."""
from decimal import Decimal, getcontext

def calculate_pi(precision=100):
    getcontext().prec = precision + 5
    a = Decimal(1)
    b = Decimal(1) / Decimal(2).sqrt()
    t = Decimal(0.25)
    p = Decimal(1)
    for _ in range(10):
        a_next = (a + b) / 2
        b = (a * b).sqrt()
        t -= p * (a - a_next) ** 2
        a = a_next
        p *= 2
    return (a + b) ** 2 / (4 * t)

if __name__ == "__main__":
    pi = calculate_pi(100)
    print(f"PI calculated to 100 decimal places:\n{pi}")
