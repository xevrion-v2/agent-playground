export function percentFormat(value: number, decimals: number = 2): string {
  return (value * 100).toFixed(decimals) + '%';
}
