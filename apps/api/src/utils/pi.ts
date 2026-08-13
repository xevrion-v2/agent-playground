// Spigot algorithm for exact Pi calculation using BigInt
export function* generatePi(): Generator<bigint, never, void> {
  let q = 1n, r = 0n, t = 1n, k = 1n, n = 3n, l = 3n;
  while (true) {
    if (4n * q + r - t < n * t) {
      yield n;
      let nr = 10n * (r - n * t);
      n = (10n * (3n * q + r)) / t - 10n * n;
      q *= 10n;
      r = nr;
    } else {
      let nr = (2n * q + r) * l;
      let nn = (q * (7n * k) + 2n + r * l) / (t * l);
      q *= k;
      t *= l;
      l += 2n;
      k += 1n;
      n = nn;
      r = nr;
    }
  }
}

export function calculatePi(digits: number = 100): string {
  const gen = generatePi();
  let result = gen.next().value?.toString() + ".";
  for (let i = 0; i < digits; i++) {
    result += gen.next().value?.toString();
  }
  return result;
}
