export function toPascalCase(value: string): string {
  return value
    .replace(/[_\-\s]+(.)?/g, (_, ch: string | undefined) => (ch ? ch.toUpperCase() : ""))
    .replace(/^./, (ch) => ch.toUpperCase());
}
