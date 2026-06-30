/**
 * Slugify helper — converts strings to URL-safe slugs.
 * ponytail: minimal implementation, no dependencies needed.
 */

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')      // remove non-word chars
    .replace(/[\s_-]+/g, '-')       // replace spaces/separators with -
    .replace(/^-+|-+$/g, '');       // strip leading/trailing -
}

export default slugify;
