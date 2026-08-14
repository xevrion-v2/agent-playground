// Currency formatting utility
// Bounty issue: self-created from xevrion-v2/agent-playground #33

/**
 * Formats a number as a currency string.
 *
 * @param {number} amount - The amount to format
 * @param {object} [options] - Formatting options
 * @param {string} [options.currency='USD'] - Currency code (USD, EUR, GBP, CNY, JPY)
 * @param {number} [options.decimals] - Number of decimal places (auto-detect by default)
 * @returns {string} Formatted currency string
 *
 * @example
 * formatCurrency(1234.56)           // => '$1,234.56'
 * formatCurrency(1000, {currency:'CNY'}) // => '楼1,000.00'
 * formatCurrency(0)                 // => '$0.00'
 * formatCurrency(99.9)              // => '$99.90'
 */
function formatCurrency(amount, options = {}) {
  if (typeof amount !== 'number' || !Number.isFinite(amount)) {
    throw new Error('formatCurrency(): amount must be a finite number');
  }

  const { currency = 'USD', decimals } = options;

  // Currency symbols and default decimal places
  const currencyConfig = {
    USD: { symbol: '$', defaultDecimals: 2 },
    EUR: { symbol: '鈧?, defaultDecimals: 2 },
    GBP: { symbol: '拢', defaultDecimals: 2 },
    CNY: { symbol: '楼', defaultDecimals: 2 },
    JPY: { symbol: '楼', defaultDecimals: 0 },
    CAD: { symbol: 'C$', defaultDecimals: 2 },
    AUD: { symbol: 'A$', defaultDecimals: 2 },
  };

  const config = currencyConfig[currency];
  if (!config) {
    throw new Error('formatCurrency(): unsupported currency code: ' + currency);
  }

  const decimalPlaces = decimals !== undefined ? decimals : config.defaultDecimals;

  // Handle negative amounts
  const isNegative = amount < 0;
  const absoluteAmount = Math.abs(amount);

  // Format with locale-aware number formatting
  const formatted = absoluteAmount.toLocaleString('en-US', {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });

  return (isNegative ? '-' : '') + config.symbol + formatted;
}

/**
 * Parses a currency string back to a number.
 *
 * @param {string} str - Currency string to parse
 * @returns {number|null} Parsed amount, or null if invalid
 *
 * @example
 * parseCurrency('$1,234.56')  // => 1234.56
 * parseCurrency('楼1,000')     // => 1000
 * parseCurrency('invalid')    // => null
 */
function parseCurrency(str) {
  if (typeof str !== 'string' || str.trim() === '') return null;

  // Remove currency symbols, spaces, and non-numeric chars except . and -
  const cleaned = str.replace(/[^0-9.\-]/g, '');
  const num = parseFloat(cleaned);

  if (isNaN(num)) return null;
  return num;
}

module.exports = { formatCurrency, parseCurrency };
