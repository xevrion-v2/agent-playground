export function capitalizeWord(value: string): string {
  if (value.length === 0) {
    return value;
  }

  return value[0].toUpperCase() + value.slice(1);
}
