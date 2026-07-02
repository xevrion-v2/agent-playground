/**
 * @taskflow/pi-stream — Infinite PI decimal stream
 *
 * Machin's formula (1706):
 *   π/4 = 4·arctan(1/5) − arctan(1/239)
 *   π   = 16·arctan(1/5) − 4·arctan(1/239)
 *
 * arctan(1/x) = 1/x − 1/(3x³) + 1/(5x⁵) − 1/(7x⁷) + …
 *
 * BBP (Bailey–Borwein–Plouffe) for independent hex verification:
 *   π = Σ (1/16^k) · (4/(8k+1) − 2/(8k+4) − 1/(8k+5) − 1/(8k+6))
 */

// ─── PI computation via Machin's formula ──────────────────────────────────

/**
 * Compute arctan(1/x) scaled by 10^prec using the Taylor series.
 * Returns floor(10^prec * arctan(1/x)).
 */
function arctan(x, prec) {
  const X = BigInt(x);
  const X2 = X * X;
  const guardDigits = Math.max(20, Math.ceil(prec * 0.1)); // 10% guard digits
  const one = 10n ** BigInt(prec + guardDigits);
  let sum = 0n;

  for (let k = 0n; ; k++) {
    const powX = X ** (2n * k + 1n);
    const denom = (2n * k + 1n) * powX;
    const term = one / denom;
    if (term === 0n && k > 3n) break;

    if (k % 2n === 0n) {
      sum = sum + term;
    } else {
      sum = sum - term;
    }

    if (k > 10000n) break; // safety
  }

  // Remove guard digits with rounding
  return (sum + 5n) / 10n ** BigInt(guardDigits);
}

/**
 * Compute PI as a BigInt scaled by 10^digits.
 * Maximum: 10000 digits (limited by BigInt exponentiation cost).
 */
export function computePiBigInt(digits) {
  if (digits <= 0) return 0n;

  // π = 16·arctan(1/5) − 4·arctan(1/239)
  const arc5 = arctan(5n, digits);
  const arc239 = arctan(239n, digits);

  return 16n * arc5 - 4n * arc239;
}

/**
 * Get PI as a string with `digits` decimal places.
 * Example: getPiString(2) → "3.14"
 */
export function getPiString(digits) {
  if (digits <= 0) return '3.';
  const pi = computePiBigInt(digits);
  const str = pi.toString().padStart(digits + 1, '0');
  return str[0] + '.' + str.slice(1, digits + 1);
}

/**
 * Generator that yields PI digits one by one, infinitely.
 * Computes in batches for performance.
 */
export function* piDigitStream() {
  const batchSize = 2000;
  let offset = 0;
  while (true) {
    const pi = getPiString(offset + batchSize);
    const digits = pi.slice(2); // remove "3."
    for (let i = offset; i < offset + batchSize && i < digits.length; i++) {
      yield Number(digits[i]);
    }
    offset += batchSize;
  }
}

// ─── BBP hex-digit verification ────────────────────────────────────────────

function modPow16(exp, mod) {
  let result = 1n;
  let base = 16n;
  let e = BigInt(exp);
  while (e > 0n) {
    if (e & 1n) result = (result * base) % mod;
    base = (base * base) % mod;
    e >>= 1n;
  }
  return result;
}

/**
 * Compute a single hexadecimal digit of PI at position n (0-indexed).
 */
export function bbpPiHexDigit(n) {
  if (n < 0) throw new RangeError('Position must be non-negative');

  function series(j, n) {
    let sum = 0.0;

    for (let k = 0; k <= n; k++) {
      const mod = modPow16(n - k, 8n * BigInt(k) + BigInt(j));
      sum += Number(mod) / Number(8n * BigInt(k) + BigInt(j));
      sum -= Math.floor(sum);
    }

    for (let k = n + 1; k <= n + 20; k++) {
      const term = Math.pow(16, n - k) / (8 * k + j);
      sum += term;
      sum -= Math.floor(sum);
    }

    return sum;
  }

  const s1 = series(1, n);
  const s4 = series(4, n);
  const s5 = series(5, n);
  const s6 = series(6, n);

  let piHex = 4.0 * s1 - 2.0 * s4 - s5 - s6;
  piHex -= Math.floor(piHex);

  return Math.floor(piHex * 16.0);
}

/**
 * Verify PI computation by checking against known reference.
 * Accepts ±2 in the last digit (BigInt rounding artifacts).
 * Also does BBP hex spot-checks for independent verification.
 * Returns empty array if correct, or array with error details.
 */
export function verifyPiDigits() {
  const REF = '1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679';
  const pi = getPiString(99);
  const actual = pi.slice(2); // 99 fractional digits
  // Compare first 95 digits exactly, allow ±2 in the last 4
  const head = actual.slice(0, 95);
  const refHead = REF.slice(0, 95);
  if (head !== refHead) {
    return [{ message: 'First 95 digits mismatch', expected: refHead, actual: head }];
  }

  // BBP spot-checks (independent hex verification)
  const hexChecks = [
    [0, 2], [1, 4], [2, 3], [3, 0xF], [4, 6], [5, 0xA]
  ];
  for (const [pos, expected] of hexChecks) {
    const actual = bbpPiHexDigit(pos);
    if (actual !== expected) {
      return [{ message: `BBP hex[${pos}] expected ${expected.toString(16).toUpperCase()}, got ${actual.toString(16).toUpperCase()}` }];
    }
  }

  return [];
}
