/**
 * Dependency-free slugify helper for human-readable URLs.
 * Converts strings to URL-friendly slugs without external dependencies.
 */

/**
 * Options for slugify.
 */
export interface SlugifyOptions {
  /** Separator to use between words (default: "-") */
  separator?: string;
  /** Convert to lowercase (default: true) */
  lowercase?: boolean;
  /** Remove non-ASCII characters (default: true) */
  removeNonAscii?: boolean;
  /** Trim leading/trailing separators (default: true) */
  trim?: boolean;
  /** Collapse multiple separators into one (default: true) */
  collapse?: boolean;
  /** Maximum length of the slug (default: undefined, no limit) */
  maxLength?: number;
  /** Custom character replacements */
  replacements?: Record<string, string>;
  /** Preserve specific characters (don't replace with separator) */
  preserve?: string[];
}

/**
 * Default slugify options.
 */
export const DEFAULT_SLUGIFY_OPTIONS: Required<Omit<SlugifyOptions, "maxLength" | "replacements" | "preserve">> & {
  maxLength?: number;
  replacements: Record<string, string>;
  preserve: string[];
} = {
  separator: "-",
  lowercase: true,
  removeNonAscii: true,
  trim: true,
  collapse: true,
  maxLength: undefined,
  replacements: {},
  preserve: [],
};

/**
 * Common character replacements for accented and special characters.
 */
export const COMMON_REPLACEMENTS: Record<string, string> = {
  // Accented characters
  à: "a", á: "a", â: "a", ã: "a", ä: "a", å: "a", æ: "ae",
  ç: "c",
  è: "e", é: "e", ê: "e", ë: "e",
  ì: "i", í: "i", î: "i", ï: "i",
  ð: "d", ñ: "n",
  ò: "o", ó: "o", ô: "o", õ: "o", ö: "o", ø: "o", œ: "oe",
  ù: "u", ú: "u", û: "u", ü: "u",
  ý: "y", ÿ: "y", þ: "th",
  ß: "ss",
  // Uppercase accented
  À: "A", Á: "A", Â: "A", Ã: "A", Ä: "A", Å: "A", Æ: "AE",
  Ç: "C",
  È: "E", É: "E", Ê: "E", Ë: "E",
  Ì: "I", Í: "I", Î: "I", Ï: "I",
  Ð: "D", Ñ: "N",
  Ò: "O", Ó: "O", Ô: "O", Õ: "O", Ö: "O", Ø: "O", Œ: "OE",
  Ù: "U", Ú: "U", Û: "U", Ü: "U",
  Ý: "Y", Ÿ: "Y", Þ: "TH",
  // Currency symbols
  €: "eur", £: "gbp", $: "usd", ¥: "jpy", ₽: "rub", ₹: "inr",
  // Other symbols
  &: "and", @: "at", %: "percent", +: "plus", #: "hash",
  // Common ligatures
  ﬁ: "fi", ﬂ: "fl", ﬃ: "ffi", ﬄ: "ffl", ﬅ: "st", ﬆ: "st",
};

/**
 * Converts a string to a URL-friendly slug.
 *
 * @param input - The string to slugify
 * @param options - Slugify options
 * @returns The slugified string
 *
 * @example
 * ```ts
 * slugify("Hello World!") // "hello-world"
 * slugify("Café & Bistro") // "cafe-and-bistro"
 * slugify("  Multiple   Spaces  ") // "multiple-spaces"
 * slugify("Hello World", { separator: "_" }) // "hello_world"
 * slugify("HELLO WORLD", { lowercase: false }) // "HELLO-WORLD"
 * slugify("Very Long Title That Needs Truncation", { maxLength: 20 }) // "very-long-title-that"
 * ```
 */
export function slugify(input: string, options: SlugifyOptions = {}): string {
  if (typeof input !== "string") {
    return "";
  }

  const opts = { ...DEFAULT_SLUGIFY_OPTIONS, ...options };
  const separator = opts.separator ?? "-";
  const allReplacements = { ...COMMON_REPLACEMENTS, ...opts.replacements };

  let result = input;

  // Apply custom replacements first
  for (const [char, replacement] of Object.entries(allReplacements)) {
    result = result.split(char).join(replacement);
  }

  // Convert to lowercase if requested
  if (opts.lowercase) {
    result = result.toLowerCase();
  }

  // Build the regex pattern for characters to replace
  // Preserve alphanumeric characters, the separator, and any preserved characters
  const preservedChars = opts.preserve?.map((c) => c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("") ?? "";
  const separatorEscaped = separator.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  if (opts.removeNonAscii) {
    // Remove non-ASCII characters and replace non-alphanumeric with separator
    const pattern = new RegExp(`[^a-z0-9${separatorEscaped}${preservedChars}]`, "g");
    result = result.replace(pattern, separator);
  } else {
    // Replace non-alphanumeric (including Unicode) with separator
    const pattern = new RegExp(`[^\\p{L}\\p{N}${separatorEscaped}${preservedChars}]`, "gu");
    result = result.replace(pattern, separator);
  }

  // Collapse multiple separators into one
  if (opts.collapse) {
    const collapsePattern = new RegExp(`${separatorEscaped}+`, "g");
    result = result.replace(collapsePattern, separator);
  }

  // Trim leading/trailing separators
  if (opts.trim) {
    const trimPattern = new RegExp(`^${separatorEscaped}+|${separatorEscaped}+$`, "g");
    result = result.replace(trimPattern, "");
  }

  // Apply max length
  if (opts.maxLength && opts.maxLength > 0 && result.length > opts.maxLength) {
    result = result.slice(0, opts.maxLength);
    // Trim again to avoid trailing separator
    if (opts.trim) {
      const trimPattern = new RegExp(`${separatorEscaped}+$`, "g");
      result = result.replace(trimPattern, "");
    }
  }

  return result;
}

/**
 * Creates a unique slug by appending a number if the base slug already exists.
 *
 * @param input - The string to slugify
 * @param existingSlugs - Array of existing slugs to check against
 * @param options - Slugify options
 * @returns A unique slug
 *
 * @example
 * ```ts
 * uniqueSlugify("Hello World", ["hello-world"]) // "hello-world-2"
 * uniqueSlugify("Hello World", ["hello-world", "hello-world-2"]) // "hello-world-3"
 * uniqueSlugify("Hello World", []) // "hello-world"
 * ```
 */
export function uniqueSlugify(
  input: string,
  existingSlugs: string[] = [],
  options: SlugifyOptions = {},
): string {
  const baseSlug = slugify(input, options);
  const separator = options.separator ?? "-";

  if (!existingSlugs.includes(baseSlug)) {
    return baseSlug;
  }

  let counter = 2;
  let uniqueSlug = `${baseSlug}${separator}${counter}`;

  while (existingSlugs.includes(uniqueSlug)) {
    counter++;
    uniqueSlug = `${baseSlug}${separator}${counter}`;
  }

  return uniqueSlug;
}

/**
 * Checks if a string is a valid slug (only contains lowercase alphanumeric and separators).
 *
 * @param input - The string to check
 * @param separator - The separator used in the slug (default: "-")
 * @returns True if the string is a valid slug, false otherwise
 *
 * @example
 * ```ts
 * isValidSlug("hello-world") // true
 * isValidSlug("Hello World") // false
 * isValidSlug("hello_world", "_") // true
 * ```
 */
export function isValidSlug(input: string, separator = "-"): boolean {
  if (typeof input !== "string" || input.length === 0) {
    return false;
  }

  const separatorEscaped = separator.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`^[a-z0-9${separatorEscaped}]+$`);

  return pattern.test(input);
}

/**
 * Extracts the original text from a slug (best effort, not perfect).
 *
 * @param slug - The slug to deslugify
 * @param separator - The separator used in the slug (default: "-")
 * @returns The deslugified string
 *
 * @example
 * ```ts
 * deslugify("hello-world") // "hello world"
 * deslugify("cafe-and-bistro") // "cafe and bistro"
 * ```
 */
export function deslugify(slug: string, separator = "-"): string {
  if (typeof slug !== "string") {
    return "";
  }

  const separatorEscaped = separator.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`${separatorEscaped}+`, "g");

  return slug.replace(pattern, " ").trim();
}

export default slugify;
