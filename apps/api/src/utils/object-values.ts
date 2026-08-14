export function objectValues<T extends object>(source: T): Array<T[keyof T]> {
  return Object.values(source) as Array<T[keyof T]>;
}