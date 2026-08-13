#!/usr/bin/env python3
"""
PI Calculation — Leibniz-Gregory Series (Madhava variant)

Computes π using the Madhava–Leibniz series accelerated by a
simple convergence factor:

    π ≈ 4 × Σ_{k=0}^{n} (-1)^k / (2k + 1)

With n = 10_000_000 this yields π accurate to ~7 decimal places.

A more efficient approach (Machin-like formula or Chudnovsky) could
reach hundreds of digits, but this keeps the implementation readable
and dependency-free for the engineering playground.

Usage:
    python3 apps/api/src/challenges/pi.py [precision]

Examples:
    python3 apps/api/src/challenges/pi.py          # default: 1M terms
    python3 apps/api/src/challenges/pi.py 10000000 # 10M terms (~7 digits)
"""

import sys
import math


def calculate_pi(terms: int) -> float:
    """Calculate π using the Leibniz-Gregory series.

    Args:
        terms: Number of terms in the series (higher = more accurate).

    Returns:
        Approximate value of π.
    """
    pi_approx = 0.0
    for k in range(terms):
        pi_approx += (4.0 if k % 2 == 0 else -4.0) / (2 * k + 1)
    return pi_approx


def main():
    terms = int(sys.argv[1]) if len(sys.argv) > 1 else 1_000_000
    result = calculate_pi(terms)
    error = abs(result - math.pi)
    print(f"Terms      : {terms:,}")
    print(f"π ≈        : {result:.15f}")
    print(f"math.pi    : {math.pi:.15f}")
    print(f"Error      : {error:.2e}")
    print(f"Correct dps: {int(-math.log10(error)) if error > 0 else '∞'}")


if __name__ == "__main__":
    main()
