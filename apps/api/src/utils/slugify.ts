/**
 * Dependency-free slugify helper for human-readable task and profile URLs.
 *
 * Converts arbitrary text into a URL-safe slug:
 * - Unicode-normalizes and strips diacritics (é → e, ñ → n)
 * - Lowercases everything
 * - Replaces runs of non-alphanumeric characters with a single hyphen
 * - Trims leading/trailing hyphens
 * - Optionally truncates to `maxLength` without leaving a trailing hyphen
 *
 * @example
 * slugify("Hello, World!")            // "hello-world"
 * slugify("  Café del Mar 2026 ")      // "cafe-del-mar-2026"
 * slugify("a".repeat(100), { maxLength: 10 }) // "aaaaaaaaaa"
 *
 * @param input - The text to slugify. Must be a string.
 * @param options - Optional settings (`maxLength` to cap the slug length).
 * @returns The URL-safe slug. Returns an empty string when nothing slugifiable remains.
 * @throws {TypeError} When `input` is not a string.
 */
export function slugify(input: string, options: { maxLength?: number } = {}): string {
  if (typeof input !== "string") {
    throw new TypeError(`slugify expected a string, received ${typeof input}`);
  }

  let slug = input
    .normalize("NFKD") // decompose accented characters
    .replace(/[\u0300-\u036f]/g, "") // strip combining diacritical marks
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // runs of non-alphanumerics → single hyphen
    .replace(/^-+|-+$/g, ""); // trim edge hyphens

  const maxLength = options.maxLength;
  if (typeof maxLength === "number" && Number.isFinite(maxLength) && maxLength >= 0) {
    slug = slug.slice(0, Math.floor(maxLength)).replace(/-+$/g, "");
  }

  return slug;
}
