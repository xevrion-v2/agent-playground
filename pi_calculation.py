"""
PI Calculation Challenge — Monte Carlo vs Leibniz Series

Two independent approaches compared for accuracy and performance:
1. Monte Carlo method (probabilistic, converges slowly)
2. Gregory-Leibniz series (deterministic, converges slowly)

Reference: π ≈ 3.14159265358979323846
"""
import random
import math
from time import perf_counter


def pi_monte_carlo(iterations: int = 1_000_000) -> tuple[float, float]:
    """Estimate π using Monte Carlo simulation.

    Random points in a unit square; π = 4 × (points inside quarter-circle / total points).
    """
    inside = 0
    for _ in range(iterations):
        x, y = random.random(), random.random()
        if x * x + y * y <= 1.0:
            inside += 1
    pi = 4.0 * inside / iterations
    error = abs(pi - math.pi)
    return pi, error


def pi_leibniz(terms: int = 1_000_000) -> tuple[float, float]:
    """Estimate π using the Gregory-Leibniz series.

    π/4 = 1 - 1/3 + 1/5 - 1/7 + 1/9 - ...
    """
    pi_4 = 0.0
    sign = 1
    for i in range(terms):
        pi_4 += sign / (2 * i + 1)
        sign = -sign
    pi = 4.0 * pi_4
    error = abs(pi - math.pi)
    return pi, error


def pi_machin() -> tuple[float, float]:
    """Machin's formula: π/4 = 4·arctan(1/5) - arctan(1/239).

    Converges much faster than Leibniz."""
    def arctan(x: float, terms: int = 10) -> float:
        result = 0.0
        sign = 1
        for i in range(terms):
            k = 2 * i + 1
            result += sign * (x ** k) / k
            sign = -sign
        return result
    pi = 4.0 * (4.0 * arctan(1.0 / 5.0, 10) - arctan(1.0 / 239.0, 4))
    error = abs(pi - math.pi)
    return pi, error


if __name__ == "__main__":
    print(f"Reference π:   {math.pi}")
    print()

    for name, func, n in [
        ("Monte Carlo (1M pts)", pi_monte_carlo, 1_000_000),
        ("Leibniz (1M terms)", pi_leibniz, 1_000_000),
        ("Machin's formula", pi_machin, None),
    ]:
        start = perf_counter()
        pi_val, err = func(n) if n else func()
        elapsed = perf_counter() - start
        print(f"{name}:")
        print(f"  π = {pi_val:.10f}, error = {err:.2e}, time = {elapsed:.3f}s")
