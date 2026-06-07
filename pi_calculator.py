#!/usr/bin/env python3
"""
PI Calculation Utility

Calculates PI to arbitrary precision using the Chudnovsky algorithm.
Includes accuracy comparison and documentation of the approach.

Usage:
    python3 pi_calculator.py [digits]

Examples:
    python3 pi_calculator.py          # Default: 50 digits
    python3 pi_calculator.py 100      # 100 decimal places
"""

import sys
from decimal import Decimal, getcontext


def calculate_pi(precision: int = 50) -> str:
    """Calculate PI to the specified number of decimal places.

    Uses the Chudnovsky algorithm, one of the fastest known
    algorithms for computing PI. Each iteration adds ~14 digits.

    Args:
        precision: Number of decimal places (default 50, max 10000).

    Returns:
        PI as a string with the specified precision.

    Reference:
        https://en.wikipedia.org/wiki/Chudnovsky_algorithm
    """
    getcontext().prec = precision + 10  # Extra guard digits

    C = 426880 * Decimal(10005).sqrt()
    K = Decimal(6)
    M = Decimal(1)
    X = Decimal(1)
    L = Decimal(13591409)
    S = Decimal(13591409)

    for k in range(1, precision // 14 + 2):
        M = M * (K ** 3 - 16 * K) / (k ** 3)
        K += Decimal(12)
        L += Decimal(545140134)
        X *= Decimal(-262537412640768000)
        S += M * L / X

    pi = C / S
    return format(pi, f".{precision}f")


def main():
    digits = int(sys.argv[1]) if len(sys.argv) > 1 else 50
    if digits < 1:
        digits = 1
    if digits > 10000:
        digits = 10000

    pi = calculate_pi(digits)
    print(f"PI to {digits} decimal places:")
    print(pi)

    # Quick accuracy check against known reference
    reference = "3.14159265358979323846264338327950288419716939937510"
    matches = 0
    for a, b in zip(pi, reference):
        if a == b:
            matches += 1
        else:
            break
    print(f"\nAccuracy: {matches} characters match known value")


if __name__ == "__main__":
    main()
