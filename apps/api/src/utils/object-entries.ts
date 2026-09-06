export function objectEntries<T extends object>(source: T): Array<[keyof T, T[keyof T]]> {
  return Object.entries(source) as Array<[keyof T, T[keyof T]]>;
}
