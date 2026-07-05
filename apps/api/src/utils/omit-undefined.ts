type DefinedValues<T extends Record<string, unknown>> = Partial<{
  [Key in keyof T]: Exclude<T[Key], undefined>;
}>;

export function omitUndefined<T extends Record<string, unknown>>(
  value: T
): DefinedValues<T> {
  return Object.fromEntries(
    Object.entries(value).filter(([, entryValue]) => entryValue !== undefined)
  ) as DefinedValues<T>;
}
