import { sumNumbers } from './sum-numbers';
export function averageNumber(values: readonly number[]): number | undefined {
  if (values.length === 0) return undefined;
  return sumNumbers(values) / values.length;
}
