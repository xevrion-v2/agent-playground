export function toRecord<K extends PropertyKey, V>(entries: readonly (readonly [K, V])[]): Record<K, V> {
  return Object.fromEntries(entries) as Record<K, V>;
}