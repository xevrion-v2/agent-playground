export function calculatePi(terms, scale) {
  terms = terms || 1000000; scale = scale || 10;
  if (terms < 1 || scale < 1) throw new Error("invalid");
  const S = 10n ** BigInt(scale + 6);
  let sum = 0n;
  for (let k = terms - 1; k >= 0; k--) {
    const d = 2n * BigInt(k) + 1n;
    sum += (k % 2 === 0 ? S : -S) / d;
  }
  const s = (4n * sum).toString();
  return s[0] + "." + (s.length > 1 ? s.slice(1, 1 + scale) : "").padEnd(scale, "0");
}
export const PI_REFERENCE = "3.1415926535897932384626433832795";
