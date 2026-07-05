/**
 * Convert a string to a URL-friendly slug.
 * 
 * Examples:
 *   slugify("Hello World")       → "hello-world"
 *   slugify("  Foo Bar  ")       → "foo-bar"
 *   slugify("It's too late!")    → "its-too-late"
 *   slugify("café résumé")       → "cafe-resume"
 *   slugify("A&B<C>D")           → "a-b-c-d"
 *
 * @param str - Input string
 * @returns URL-safe slug
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .normalize('NFD')          // decompose unicode
    .replace(/[\u0300-\u036f]/g, '') // strip accents
    .replace(/[^\w\s-]/g, '')  // remove non-alphanumeric
    .replace(/[\s_]+/g, '-')   // spaces/underscores → hyphens
    .replace(/-+/g, '-')       // collapse multiple hyphens
    .replace(/^-+|-+$/g, '');  // trim leading/trailing hyphens
}
