export function hasOwn<T extends object, K extends PropertyKey>(source: T, key: K): source is T & Record<K, unknown> {
  return Object.prototype.hasOwnProperty.call(source, key);
}