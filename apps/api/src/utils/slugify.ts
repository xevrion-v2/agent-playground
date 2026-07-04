export function slugify(value: string): string {
  return value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")       // spaces to dashes
    .replace(/[^\w\-]+/g, "")   // remove non-word chars
    .replace(/\-\-+/g, "-")     // collapse multiple dashes
    .replace(/^-+/, "")         // trim leading dash
    .replace(/-+$/, "");        // trim trailing dash
}
