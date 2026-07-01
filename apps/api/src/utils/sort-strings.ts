export function sortStrings(
  values: readonly string[],
  locales?: Intl.LocalesArgument,
  options?: Intl.CollatorOptions,
): string[] {
  return [...values].sort((left, right) =>
    left.localeCompare(right, locales, options),
  );
}
