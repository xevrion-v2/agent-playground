const DEFAULT_DIGITS = {
  USD: 2,
  EUR: 2,
  GBP: 2,
  CNY: 2,
  JPY: 0,
  CAD: 2,
  AUD: 2,
};

function normalizeCurrency(currency) {
  if (typeof currency !== "string") {
    return null;
  }

  const code = currency.trim().toUpperCase();
  return DEFAULT_DIGITS[code] === undefined ? null : code;
}

function resolveDigits(currency, decimalPlaces) {
  if (Number.isInteger(decimalPlaces) && decimalPlaces >= 0) {
    return decimalPlaces;
  }

  return DEFAULT_DIGITS[currency];
}

function normalizeNumberInput(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function sanitizeCurrencyText(value) {
  let text = String(value).trim();
  if (!text) {
    return "";
  }

  let negative = false;
  if (text.startsWith("(") && text.endsWith(")")) {
    negative = true;
    text = text.slice(1, -1);
  }

  if (text.startsWith("-")) {
    negative = !negative;
    text = text.slice(1);
  }

  text = text.replace(/[^0-9.,]/g, "").replace(/,/g, "");
  if (!text) {
    return "";
  }

  return `${negative ? "-" : ""}${text}`;
}

export function formatCurrency(value, currency, decimalPlaces) {
  const code = normalizeCurrency(currency);
  if (!code || !normalizeNumberInput(value)) {
    return "";
  }

  const digits = resolveDigits(code, decimalPlaces);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: code,
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

export function parseCurrency(value, currency, decimalPlaces) {
  const code = normalizeCurrency(currency);
  if (!code || value == null) {
    return Number.NaN;
  }

  const digits = resolveDigits(code, decimalPlaces);
  const text = sanitizeCurrencyText(value);
  if (!text) {
    return Number.NaN;
  }

  const amount = Number(text);
  if (!Number.isFinite(amount)) {
    return Number.NaN;
  }

  if (digits === 0) {
    return Math.trunc(amount);
  }

  const factor = 10 ** digits;
  return Math.round(amount * factor) / factor;
}

export default {
  formatCurrency,
  parseCurrency,
};
