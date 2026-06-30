export type AnyFunction = (...args: unknown[]) => unknown;

export function isFunction(value: unknown): value is AnyFunction {
  return typeof value === 'function';
}
