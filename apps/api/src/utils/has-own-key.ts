export function hasOwnKey<T extends object, K extends PropertyKey>(
  record: T,
  key: K,
): record is T & Record<K, unknown> {
  return Object.prototype.hasOwnProperty.call(record, key);
}
