/**
 * Converts a string into a URL-safe slug.
 * @param str - The input string to slugify.
 * @returns A lowercase, hyphen-separated slug with non-alphanumeric characters removed.
 *
 * @example
 * `	s
 * slugify('Hello World!'); // => 'hello-world'
 * slugify('  Foo Bar  '); // => 'foo-bar'
 * slugify(''); // => ''
 * `
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
