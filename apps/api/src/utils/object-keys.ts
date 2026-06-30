export function objectKeys<T extends object>(source: T): Array<keyof T> {
  return Object.keys(source) as Array<keyof T>;
}