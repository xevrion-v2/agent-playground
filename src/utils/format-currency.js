const SYMBOLS = Object.freeze({
  USD: '$',
  EUR: '\u20ac',
  GBP: '\u00a3',
  CNY: '\u00a5',
  JPY: '\u00a5',
  CAD: 'C$',
  AUD: 'A$',
});

const DEFAULT_DECIMALS = Object.freeze({
  USD: 2,
  EUR: 2,
  GBP: 2,
  CNY: 2,
  JPY: 0,
  CAD: 2,
  AUD: 2,
});

function toFiniteNumber(value) {
  if (typeof value === 'string' && value.trim() === '') {
    return undefined;
  }

  const number = Number(value);
  return Number.isFinite(number) ? number : undefined;
}

function normalizeCurrency(currency) {
  const normalized = String(currency || 'USD').toUpperCase();
  return Object.hasOwn(SYMBOLS, normalized) ? normalized : undefined;
}

function normalizeDecimals(currency, options) {
  const configured = options && options.decimals;
  if (configured === undefined || configured === null) {
    return DEFAULT_DECIMALS[currency];
  }

  const decimals = Number(configured);
  if (!Number.isFinite(decimals) || decimals < 0) {
    return DEFAULT_DECIMALS[currency];
  }

  return Math.trunc(decimals);
}

function addThousandsSeparators(value) {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function formatCurrency(amount, currency = 'USD', options = {}) {
  const value = toFiniteNumber(amount);
  const normalizedCurrency = normalizeCurrency(currency);

  if (value === undefined || normalizedCurrency === undefined) {
    return '';
  }

  const decimals = normalizeDecimals(normalizedCurrency, options);
  const fixed = Math.abs(value).toFixed(decimals);
  const [integerPart, decimalPart] = fixed.split('.');
  const formatted = `${SYMBOLS[normalizedCurrency]}${addThousandsSeparators(integerPart)}`;
  const sign = value < 0 ? '-' : '';

  return decimalPart ? `${sign}${formatted}.${decimalPart}` : `${sign}${formatted}`;
}

function parseCurrency(value) {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : undefined;
  }

  if (typeof value !== 'string') {
    return undefined;
  }

  let text = value.trim();
  if (text === '') {
    return undefined;
  }

  const parenthesizedNegative = text.startsWith('(') && text.endsWith(')');
  text = text.replace(/[()]/g, '').trim();
  const signedNegative = text.startsWith('-');
  text = text.replace(/^[+-]/, '').replace(/,/g, '').replace(/[^\d.]/g, '');

  if (!/\d/.test(text) || text.split('.').length > 2) {
    return undefined;
  }

  const number = Number(text);
  if (!Number.isFinite(number)) {
    return undefined;
  }

  return parenthesizedNegative || signedNegative ? -number : number;
}

module.exports = {
  formatCurrency,
  parseCurrency,
};
