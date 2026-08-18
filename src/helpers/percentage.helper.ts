export interface PercentageOptions {
  decimals?: number;
  round?: boolean;
  includeSpace?: boolean;
  fallback?: string;
}

export function formatPercentage(
  value: unknown,
  options: PercentageOptions = {}
): string {
  const {
    decimals = 0,
    round = true,
    includeSpace = false,
    fallback = '0%'
  } = options;

  if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
    return fallback;
  }

  let percentage = value * 100;
  
  if (round) {
    percentage = Number(percentage.toFixed(decimals));
  } else {
    const factor = Math.pow(10, decimals);
    percentage = Math.floor(percentage * factor) / factor;
  }

  const space = includeSpace ? ' ' : '';
  const sign = percentage > 0 ? '+' : '';
  const formatted = percentage.toFixed(decimals);
  
  return `${sign}${formatted}${space}%`;
}

export function safeFormatPercentage(
  value: unknown,
  options: PercentageOptions = {}
): string | null {
  const { decimals = 0, round = true, includeSpace = false } = options;

  if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
    return null;
  }

  let percentage = value * 100;
  
  if (round) {
    percentage = Number(percentage.toFixed(decimals));
  } else {
    const factor = Math.pow(10, decimals);
    percentage = Math.floor(percentage * factor) / factor;
  }

  const space = includeSpace ? ' ' : '';
  const sign = percentage > 0 ? '+' : '';
  const formatted = percentage.toFixed(decimals);
  
  return `${sign}${formatted}${space}%`;
}
