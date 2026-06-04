import sys

def calculate_pi(digits):
    """
    Gibbons' streaming Spigot algorithm for calculating pi digits.
    This algorithm is deterministic, exact, and works entirely with integers.
    """
    q, r, t, k, n, l = 1, 0, 1, 1, 3, 3
    result = []
    while len(result) < digits:
        if 4 * q + r - t < n * t:
            result.append(n)
            q, r, t, k, n, l = 10 * q, 10 * (r - n * t), t, k, (10 * (3 * q + r)) // t - 10 * n, l
        else:
            q, r, t, k, n, l = q * k, (2 * q + r) * l, t * l, k + 1, (q * (7 * k + 2) + r * l) // (t * l), l + 2
    return str(result[0]) + "." + "".join(map(str, result[1:]))

if __name__ == '__main__':
    digits = 100
    if len(sys.argv) > 1:
        try:
            digits = int(sys.argv[1])
        except ValueError:
            print("Invalid digits input. Defaulting to 100.")
            
    print(f"Calculating PI to {digits} digits using the Spigot algorithm:")
    print(calculate_pi(digits))
