/**
 * Parses common string representations of a boolean into a `boolean`.
 *
 * Matching is case-insensitive and ignores surrounding whitespace.
 *   - true:  "true", "t", "yes", "y", "1", "on"
 *   - false: "false", "f", "no", "n", "0", "off"
 *
 * Returns `undefined` for any value that is not a recognized boolean string,
 * so callers can distinguish "unknown input" from an explicit `false`.
 *
 * Has no runtime dependencies and is safe under TypeScript strict compilation.
 *
 * @example
 * parseBoolean("Yes")   // => true
 * parseBoolean(" off ") // => false
 * parseBoolean("maybe") // => undefined
 */
const BOOLEAN_STRINGS: Record<string, boolean> = {
  true: true,
  t: true,
  yes: true,
  y: true,
  "1": true,
  on: true,
  false: false,
  f: false,
  no: false,
  n: false,
  "0": false,
  off: false,
};

export function parseBoolean(value: string): boolean | undefined {
  const normalized = value.trim().toLowerCase();

  if (Object.prototype.hasOwnProperty.call(BOOLEAN_STRINGS, normalized)) {
    return BOOLEAN_STRINGS[normalized];
  }

  return undefined;
}
