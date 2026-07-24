export function isPromiseLike(value: unknown): value is Promise<unknown> {
  return typeof (value as any)?.then === 'function';
}
