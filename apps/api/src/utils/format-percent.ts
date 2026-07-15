export function formatPercent(value: number, digits = 0): string {
  return `${roundPercent(value, digits)}%`;
}

function roundPercent(value: number, digits: number): string {
  return (value * 100).toFixed(digits);
}
