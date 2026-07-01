import sys
from decimal import Decimal, getcontext


def compute_pi(digits: int) -> str:
    getcontext().prec = digits + 10

    def arctan(x: Decimal) -> Decimal:
        term = x
        total = x
        k = 1
        while True:
            k += 2
            term *= -x * x
            step = term / k
            if abs(step) < Decimal(10) ** -(digits + 2):
                break
            total += step
        return total

    pi = 16 * arctan(Decimal(1) / 5) - 4 * arctan(Decimal(1) / 239)
    text = format(pi, f".{digits}f")
    if not text.startswith("3."):
        text = "3." + text.split(".", 1)[1]
    return text


if __name__ == "__main__":
    print(compute_pi(int(sys.argv[1])))
