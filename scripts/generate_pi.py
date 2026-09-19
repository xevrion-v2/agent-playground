#!/usr/bin/env python3
"""Reproducible PI generator — Chudnovsky binary splitting.
Usage: python3 scripts/generate_pi.py [digits]  (default 50000)
"""
import sys
from decimal import Decimal, getcontext

def chudnovsky(n):
    getcontext().prec = n + 15
    sys.setrecursionlimit(1000000)
    def bs(a, b):
        if b - a == 1:
            Pab = 1 if a == 0 else -(6*a-5)*(2*a-1)*(6*a-1)
            Qab = 1 if a == 0 else 10939058860032000 * a**3
            return Pab, Qab, Pab * (13591409 + 545140134 * a)
        m = (a+b)//2
        Pa, Qa, Ta = bs(a, m)
        Pb, Qb, Tb = bs(m, b)
        return Pa*Pb, Qa*Qb, Qb*Ta + Pa*Tb
    _, Q, T = bs(0, n//14+2)
    return str((Decimal(426880) * Decimal(10005).sqrt() * Q) / T)[:n+2]

if __name__ == "__main__":
    n = int(sys.argv[1]) if len(sys.argv) > 1 else 50000
    pi = chudnovsky(n)
    print("3.")
    d = pi[2:]
    for i in range(0, len(d), 100):
        line = d[i:i+100]
        print(" ".join(line[j:j+10] for j in range(0, len(line), 10)))
