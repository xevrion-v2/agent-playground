/**
 * String utility functions for API input processing and formatting.
 * Provides common string manipulation helpers.
 */

/**
 * Capitalizes the first letter of a string.
 *
 * @param str - The input string
 * @returns The string with the first letter capitalized
 *
 * @example
 * ```ts
 * capitalize("hello") // "Hello"
 * capitalize("HELLO") // "HELLO"
 * capitalize("") // ""
 * ```
 */
export function capitalize(str: string): string {
  if (!str || typeof str !== "string") return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Converts a string to title case.
 *
 * @param str - The input string
 * @returns The string in title case
 *
 * @example
 * ```ts
 * titleCase("hello world") // "Hello World"
 * titleCase("HELLO WORLD") // "Hello World"
 * titleCase("the quick brown fox") // "The Quick Brown Fox"
 * ```
 */
export function titleCase(str: string): string {
  if (!str || typeof str !== "string") return "";
  return str
    .toLowerCase()
    .split(" ")
    .filter((word) => word.length > 0)
    .map((word) => capitalize(word))
    .join(" ");
}

/**
 * Converts a string to camelCase.
 *
 * @param str - The input string
 * @returns The string in camelCase
 *
 * @example
 * ```ts
 * camelCase("hello world") // "helloWorld"
 * camelCase("Hello World") // "helloWorld"
 * camelCase("hello-world") // "helloWorld"
 * camelCase("hello_world") // "helloWorld"
 * ```
 */
export function camelCase(str: string): string {
  if (!str || typeof str !== "string") return "";
  const words = str
    .replace(/[-_]/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .toLowerCase()
    .split(" ")
    .filter((word) => word.length > 0);

  if (words.length === 0) return "";
  return words[0] + words.slice(1).map((word) => capitalize(word)).join("");
}

/**
 * Converts a string to PascalCase.
 *
 * @param str - The input string
 * @returns The string in PascalCase
 *
 * @example
 * ```ts
 * pascalCase("hello world") // "HelloWorld"
 * pascalCase("hello-world") // "HelloWorld"
 * pascalCase("hello_world") // "HelloWorld"
 * ```
 */
export function pascalCase(str: string): string {
  return capitalize(camelCase(str));
}

/**
 * Converts a string to kebab-case.
 *
 * @param str - The input string
 * @returns The string in kebab-case
 *
 * @example
 * ```ts
 * kebabCase("hello world") // "hello-world"
 * kebabCase("HelloWorld") // "hello-world"
 * kebabCase("hello_world") // "hello-world"
 * ```
 */
export function kebabCase(str: string): string {
  if (!str || typeof str !== "string") return "";
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[-_\s]+/g, "-")
    .toLowerCase();
}

/**
 * Converts a string to snake_case.
 *
 * @param str - The input string
 * @returns The string in snake_case
 *
 * @example
 * ```ts
 * snakeCase("hello world") // "hello_world"
 * snakeCase("HelloWorld") // "hello_world"
 * snakeCase("hello-world") // "hello_world"
 * ```
 */
export function snakeCase(str: string): string {
  if (!str || typeof str !== "string") return "";
  return str
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/[-_\s]+/g, "_")
    .toLowerCase();
}

/**
 * Converts a string to CONSTANT_CASE.
 *
 * @param str - The input string
 * @returns The string in CONSTANT_CASE
 *
 * @example
 * ```ts
 * constantCase("hello world") // "HELLO_WORLD"
 * constantCase("helloWorld") // "HELLO_WORLD"
 * ```
 */
export function constantCase(str: string): string {
  return snakeCase(str).toUpperCase();
}

/**
 * Truncates a string to a specified length with an ellipsis.
 *
 * @param str - The input string
 * @param maxLength - The maximum length (including ellipsis)
 * @param ellipsis - The ellipsis string (default: "...")
 * @returns The truncated string
 *
 * @example
 * ```ts
 * truncate("Hello World", 8) // "Hello..."
 * truncate("Hello", 10) // "Hello"
 * truncate("Hello World", 5, "~") // "Hell~"
 * ```
 */
export function truncate(str: string, maxLength: number, ellipsis = "..."): string {
  if (!str || typeof str !== "string") return "";
  if (str.length <= maxLength) return str;
  if (maxLength <= ellipsis.length) return ellipsis.slice(0, maxLength);
  return str.slice(0, maxLength - ellipsis.length) + ellipsis;
}

/**
 * Removes extra whitespace from a string (multiple spaces to single, trims edges).
 *
 * @param str - The input string
 * @returns The string with normalized whitespace
 *
 * @example
 * ```ts
 * normalizeWhitespace("  hello   world  ") // "hello world"
 * normalizeWhitespace("hello\n\nworld") // "hello world"
 * ```
 */
export function normalizeWhitespace(str: string): string {
  if (!str || typeof str !== "string") return "";
  return str.replace(/\s+/g, " ").trim();
}

/**
 * Removes all whitespace from a string.
 *
 * @param str - The input string
 * @returns The string with all whitespace removed
 *
 * @example
 * ```ts
 * removeWhitespace("  hello world  ") // "helloworld"
 * removeWhitespace("hello\nworld") // "helloworld"
 * ```
 */
export function removeWhitespace(str: string): string {
  if (!str || typeof str !== "string") return "";
  return str.replace(/\s+/g, "");
}

/**
 * Reverses a string.
 *
 * @param str - The input string
 * @returns The reversed string
 *
 * @example
 * ```ts
 * reverse("hello") // "olleh"
 * reverse("Hello World") // "dlroW olleH"
 * ```
 */
export function reverse(str: string): string {
  if (!str || typeof str !== "string") return "";
  return str.split("").reverse().join("");
}

/**
 * Checks if a string is a palindrome.
 *
 * @param str - The input string
 * @returns True if the string is a palindrome, false otherwise
 *
 * @example
 * ```ts
 * isPalindrome("racecar") // true
 * isPalindrome("hello") // false
 * isPalindrome("A man a plan a canal Panama") // true (ignores case and spaces)
 * ```
 */
export function isPalindrome(str: string): boolean {
  if (!str || typeof str !== "string") return false;
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleaned === reverse(cleaned);
}

/**
 * Counts the number of words in a string.
 *
 * @param str - The input string
 * @returns The number of words
 *
 * @example
 * ```ts
 * countWords("hello world") // 2
 * countWords("  hello   world  ") // 2
 * countWords("") // 0
 * ```
 */
export function countWords(str: string): number {
  if (!str || typeof str !== "string") return 0;
  const trimmed = str.trim();
  if (trimmed === "") return 0;
  return trimmed.split(/\s+/).length;
}

/**
 * Counts the occurrences of a substring in a string.
 *
 * @param str - The input string
 * @param substring - The substring to count
 * @returns The number of occurrences
 *
 * @example
 * ```ts
 * countOccurrences("hello hello world", "hello") // 2
 * countOccurrences("hello", "l") // 2
 * countOccurrences("hello", "xyz") // 0
 * ```
 */
export function countOccurrences(str: string, substring: string): number {
  if (!str || !substring || typeof str !== "string" || typeof substring !== "string") return 0;
  let count = 0;
  let index = 0;
  while ((index = str.indexOf(substring, index)) !== -1) {
    count++;
    index += substring.length;
  }
  return count;
}

/**
 * Checks if a string contains only alphabetic characters.
 *
 * @param str - The input string
 * @returns True if the string contains only alphabetic characters, false otherwise
 *
 * @example
 * ```ts
 * isAlpha("hello") // true
 * isAlpha("hello123") // false
 * isAlpha("") // false
 * ```
 */
export function isAlpha(str: string): boolean {
  if (!str || typeof str !== "string") return false;
  return /^[a-zA-Z]+$/.test(str);
}

/**
 * Checks if a string contains only alphanumeric characters.
 *
 * @param str - The input string
 * @returns True if the string contains only alphanumeric characters, false otherwise
 *
 * @example
 * ```ts
 * isAlphanumeric("hello123") // true
 * isAlphanumeric("hello!") // false
 * ```
 */
export function isAlphanumeric(str: string): boolean {
  if (!str || typeof str !== "string") return false;
  return /^[a-zA-Z0-9]+$/.test(str);
}

/**
 * Checks if a string contains only numeric characters.
 *
 * @param str - The input string
 * @returns True if the string contains only numeric characters, false otherwise
 *
 * @example
 * ```ts
 * isNumeric("12345") // true
 * isNumeric("12.34") // false
 * isNumeric("abc") // false
 * ```
 */
export function isNumeric(str: string): boolean {
  if (!str || typeof str !== "string") return false;
  return /^[0-9]+$/.test(str);
}

/**
 * Checks if a string is a valid email address.
 *
 * @param str - The input string
 * @returns True if the string is a valid email address, false otherwise
 *
 * @example
 * ```ts
 * isEmail("user@example.com") // true
 * isEmail("invalid-email") // false
 * ```
 */
export function isEmail(str: string): boolean {
  if (!str || typeof str !== "string") return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
}

/**
 * Checks if a string is a valid URL.
 *
 * @param str - The input string
 * @returns True if the string is a valid URL, false otherwise
 *
 * @example
 * ```ts
 * isUrl("https://example.com") // true
 * isUrl("not-a-url") // false
 * ```
 */
export function isUrl(str: string): boolean {
  if (!str || typeof str !== "string") return false;
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

/**
 * Masks a string, showing only the first and last characters.
 *
 * @param str - The input string
 * @param visibleStart - Number of characters to show at the start (default: 1)
 * @param visibleEnd - Number of characters to show at the end (default: 1)
 * @param maskChar - The character to use for masking (default: "*")
 * @returns The masked string
 *
 * @example
 * ```ts
 * mask("password123") // "p**********3"
 * mask("1234567890", 3, 2) // "123*****90"
 * mask("secret", 2, 2, "#") // "se##et"
 * ```
 */
export function mask(
  str: string,
  visibleStart = 1,
  visibleEnd = 1,
  maskChar = "*",
): string {
  if (!str || typeof str !== "string") return "";
  if (str.length <= visibleStart + visibleEnd) return str;
  const start = str.slice(0, visibleStart);
  const end = str.slice(str.length - visibleEnd);
  const middle = maskChar.repeat(str.length - visibleStart - visibleEnd);
  return start + middle + end;
}

/**
 * Masks an email address, showing only the first character and domain.
 *
 * @param email - The email address
 * @returns The masked email address
 *
 * @example
 * ```ts
 * maskEmail("user@example.com") // "u***@example.com"
 * maskEmail("ab@example.com") // "a*@example.com"
 * ```
 */
export function maskEmail(email: string): string {
  if (!isEmail(email)) return email;
  const [username, domain] = email.split("@");
  if (username.length <= 1) return `${username}@${domain}`;
  return `${username[0]}${"*".repeat(username.length - 1)}@${domain}`;
}

/**
 * Masks a phone number, showing only the last 4 digits.
 *
 * @param phone - The phone number
 * @returns The masked phone number
 *
 * @example
 * ```ts
 * maskPhone("1234567890") // "******7890"
 * maskPhone("+1234567890") // "*******7890"
 * ```
 */
export function maskPhone(phone: string): string {
  if (!phone || typeof phone !== "string") return "";
  const digits = phone.replace(/\D/g, "");
  if (digits.length <= 4) return phone;
  const maskLength = digits.length - 4;
  return "*".repeat(maskLength) + digits.slice(-4);
}

/**
 * Extracts all numbers from a string.
 *
 * @param str - The input string
 * @returns An array of numbers found in the string
 *
 * @example
 * ```ts
 * extractNumbers("I have 3 apples and 5 oranges") // [3, 5]
 * extractNumbers("Price: $12.99") // [12.99]
 * extractNumbers("No numbers here") // []
 * ```
 */
export function extractNumbers(str: string): number[] {
  if (!str || typeof str !== "string") return [];
  const matches = str.match(/-?\d+\.?\d*/g);
  if (!matches) return [];
  return matches.map(Number).filter((n) => !isNaN(n));
}

/**
 * Converts a string to a URL-friendly slug.
 *
 * @param str - The input string
 * @returns The URL-friendly slug
 *
 * @example
 * ```ts
 * slugify("Hello World!") // "hello-world"
 * slugify("  Hello   World  ") // "hello-world"
 * slugify("Café Résumé") // "cafe-resume"
 * ```
 */
export function slugify(str: string): string {
  if (!str || typeof str !== "string") return "";
  return str
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Repeats a string a specified number of times.
 *
 * @param str - The string to repeat
 * @param count - The number of times to repeat
 * @returns The repeated string
 *
 * @example
 * ```ts
 * repeat("ab", 3) // "ababab"
 * repeat("a", 0) // ""
 * ```
 */
export function repeat(str: string, count: number): string {
  if (!str || typeof str !== "string" || count <= 0) return "";
  return str.repeat(count);
}

/**
 * Pads a string to a specified length with a character.
 *
 * @param str - The input string
 * @param length - The target length
 * @param char - The character to pad with (default: " ")
 * @param side - The side to pad on ("start" or "end", default: "end")
 * @returns The padded string
 *
 * @example
 * ```ts
 * pad("5", 3, "0") // "500"
 * pad("5", 3, "0", "start") // "005"
 * pad("hello", 10) // "hello     "
 * ```
 */
export function pad(
  str: string,
  length: number,
  char = " ",
  side: "start" | "end" = "end",
): string {
  if (!str || typeof str !== "string") return "";
  if (str.length >= length) return str;
  const padStr = char.repeat(length - str.length);
  return side === "start" ? padStr + str : str + padStr;
}

export default {
  capitalize,
  titleCase,
  camelCase,
  pascalCase,
  kebabCase,
  snakeCase,
  constantCase,
  truncate,
  normalizeWhitespace,
  removeWhitespace,
  reverse,
  isPalindrome,
  countWords,
  countOccurrences,
  isAlpha,
  isAlphanumeric,
  isNumeric,
  isEmail,
  isUrl,
  mask,
  maskEmail,
  maskPhone,
  extractNumbers,
  slugify,
  repeat,
  pad,
};
