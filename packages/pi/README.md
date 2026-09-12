# @taskflow/pi

Exact finite decimal prefixes of π to arbitrary length — 1,000,000 digits in
under 30 seconds, 10,000,000 in under 40 minutes — with **zero runtime
dependencies**, built on native `bigint`, and cross-verified by three
mathematically independent methods discovered across three different
centuries.

Resolves issue **#17** ("Calculate the exact value of PI").

## Why "the exact value" means "an exact prefix"

π is **irrational** (Lambert, 1761) and **transcendental** (Lindemann, 1882).
Its decimal expansion neither terminates nor repeats, so *"the very last
decimal point" does not exist* — not as a limitation of hardware or
algorithms, but as a theorem. No finite output can be all of π.

What *is* computable — and what this package computes — is the **exact
truncated prefix**: for any requested `n`, every one of the `n` digits
returned is a true digit of π. The issue's quoted 100-digit value is exactly
`computePiDigits(100)`; this package extends that same exactness to a million
places and beyond.

## Quick start

```bash
npm install                       # workspace root
npm test  -w packages/pi          # 12 tests, all engines cross-checked
npm run demo -w packages/pi       # 10,000 digits + verification certificate
npm run demo -w packages/pi -- 100000
npm run demo -w packages/pi -- 50 --print
```

## API

```ts
import {
  computePiDigits,   // (digits, engine?) => "3.14159..." exact truncated prefix
  piHexDigits,       // (count) => hex digits of pi after the point
  verifyPiDigits,    // (digits) => cross-engine + BBP verification report
  certifyPiDigits,   // (digits) => reproducible SHA-256 correctness certificate
} from "@taskflow/pi";

computePiDigits(100);
// "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679"
```

## How it works

### Primary engine — Chudnovsky with binary splitting

The Chudnovsky brothers' series (1988) delivers ~14.18 decimal digits per
term and underpins every π world record since 1989:

```
1/π = 12 · Σ  (−1)^k (6k)! (13591409 + 545140134k)
      k≥0    ───────────────────────────────────────
             (3k)! (k!)³ · 640320^(3k + 3/2)
```

Naive term-by-term summation costs O(n²) bigint work and is why most
implementations slow to a crawl past a few thousand digits. This package
instead evaluates the series by **binary splitting**: the partial sum over
`[a, b)` is represented by three integers `P, Q, T` combined recursively from
half-ranges, so every multiplication happens between balanced, similar-sized
integers. Combined with a Newton-iteration integer square root for √10005,
the whole computation stays in exact integer arithmetic — floating point
never touches a digit.

### Truncation, not rounding — and a guard-band proof obligation

Reference digit tables are *truncated*. Rounding is a trap: at 100 places π
continues `...170679|8...`, so half-up rounding corrupts the final digit to
`...170680`, which is **not a digit of π** and fails comparison against the
issue's reference string (the same trap exists at 50 places: `...937510|58...`).

`computePiDigits` computes with a 12-digit guard band and truncates. If the
guard band ever evaluates to all `0`s or all `9`s — the only situation in
which a floor at the boundary could be ambiguous — the guard doubles and the
computation reruns. The returned prefix is therefore unconditionally exact,
not probabilistically exact.

### Independent verification — three formulas, three centuries

Correct-looking digits are cheap; *verified* digits are the deliverable.
`verifyPiDigits` / `certifyPiDigits` require agreement between:

| Engine | Year | Mathematics | Role |
|---|---|---|---|
| Chudnovsky + binary splitting | 1988 | Ramanujan-type hypergeometric series | primary computation |
| Machin fixed-point | 1706 | π/4 = 4·arctan(1/5) − arctan(1/239), Taylor series | full digit-for-digit decimal cross-check |
| Bailey–Borwein–Plouffe | 1995 | base-16 digit extraction at arbitrary position | spot-checks hex digits *without* computing predecessors |

The three share no code path, no series, and (for BBP) not even a radix. The
probability of independent agreement on wrong digits is negligible; this is
the strongest practical correctness evidence short of formally verifying the
implementation.

`certifyPiDigits(n)` emits a compact JSON certificate — digit count, head,
tail, SHA-256 of the full prefix, and the verification results — so anyone
can reproduce and confirm a computation without shipping megabytes of digits.

## Performance

Measured on Node 24, Windows 11, single thread (`packages/pi/bench.ts`):

| Digits | Time |
|---|---|
| 1,000 | 0.2 ms |
| 10,000 | 5.6 ms |
| 100,000 | 218 ms |
| 1,000,000 | 26.7 s |
| 10,000,000 | 2,316 s (38.6 min) |

External validation:

- the full `computePiDigits(1_000_000)` output matches Wikimedia Commons'
  published million-digit reference in **all 1,000,000 decimal places**
  (and ends `...5779458151` — the famous millionth digit `1`);
- the full `computePiDigits(10_000_000)` output matches an independent
  published 10-million-digit reference in **all 10,000,000 decimal places**,
  and its first 7.45M digits match a second, independent 2005 computation
  (QPI, Chudnovsky-based) digit-for-digit;
- BBP hex extraction at positions 1,000,000 / 4,000,000 / 8,300,000 after
  the hexadecimal point agrees with the hex expansion derived from the
  decimal output at all probed windows.

## Design constraints honored

- **Zero runtime dependencies** — native `bigint` only; `typescript`/`tsx`
  are dev-only, mirroring the other workspace packages.
- **Fully isolated** — a standalone `packages/pi` workspace; no existing
  file, route, or config is touched.
- **Deterministic** — same input, same output, same SHA-256, every run.

## References

- Chudnovsky, D. V. & Chudnovsky, G. V. (1988). *Approximations and complex
  multiplication according to Ramanujan.*
- Bailey, D., Borwein, P. & Plouffe, S. (1997). *On the rapid computation of
  various polylogarithmic constants.* Math. Comp. 66, 903–913.
- Lambert, J. H. (1761). *Mémoire sur quelques propriétés remarquables des
  quantités transcendantes circulaires et logarithmiques.*
- Lindemann, F. (1882). *Über die Zahl π.* Math. Ann. 20, 213–225.
- Haible, B. & Papanikolaou, T. (1998). *Fast multiprecision evaluation of
  series of rational numbers* (binary splitting).
