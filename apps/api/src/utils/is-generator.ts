export function isGenerator(value: unknown): value is Generator {
  return Object.prototype.toString.call(value) === "[object Generator]";
}
