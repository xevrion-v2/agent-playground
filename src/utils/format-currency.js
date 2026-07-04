const SUPPORTED_CURRENCIES = new Set(["USD", "EUR", "GBP", "CNY", "JPY", "CAD", "AUD"]);

function normalizeCurrency(currency = "USD") {
  const normalized = String(currency).trim().toUpperCase();

  if (!SUPPORTED_CURRENCIES.has(normalized)) {
    throw new RangeError(`Unsupported currency: ${currency}`);
  }

  return normalized;
}

function normalizeDecimalPlaces(decimalPlaces, currency) {
  if (decimalPlaces === undefined) {
    return currency === "JPY" ? 0 : 2;
  }

  if (!Number.isInteger(decimalPlaces) || decimalPlaces < 0 || decimalPlaces > 20) {
    throw new RangeError("decimalPlaces must be an integer between 0 and 20");
  }

  return decimalPlaces;
}

function formatCurrency(amount, options = {}) {
  const normalizedOptions = typeof options === "string" ? { currency: options } : options;
  const currency = normalizeCurrency(normalizedOptions.currency);
  const decimalPlaces = normalizeDecimalPlaces(normalizedOptions.decimalPlaces, currency);
  const locale = normalizedOptions.locale || "en-US";
  const value = typeof amount === "string" && amount.trim() !== "" ? Number(amount) : amount;

  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new TypeError("amount must be a finite number");
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(Object.is(value, -0) ? 0 : value);
}

function parseCurrency(value) {
  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      throw new TypeError("value must be finite");
    }

    return value;
  }

  if (typeof value !== "string") {
    throw new TypeError("value must be a string or number");
  }

  const trimmed = value.trim();

  if (!trimmed) {
    throw new TypeError("value cannot be empty");
  }

  const isParenthesizedNegative = /^\(.*\)$/.test(trimmed);
  const hasMinus = /-/.test(trimmed);
  let numeric = trimmed
    .replace(/[A-Z]{3}/gi, "")
    .replace(/[^\d.,-]/g, "")
    .replace(/-/g, "");

  if (!numeric || !/\d/.test(numeric)) {
    throw new TypeError("value does not contain a currency amount");
  }

  numeric = normalizeNumberSeparators(numeric);

  const parsed = Number(numeric);

  if (!Number.isFinite(parsed)) {
    throw new TypeError("value does not contain a valid currency amount");
  }

  return isParenthesizedNegative || hasMinus ? -parsed : parsed;
}

function normalizeNumberSeparators(value) {
  const lastComma = value.lastIndexOf(",");
  const lastDot = value.lastIndexOf(".");

  if (lastComma !== -1 && lastDot !== -1) {
    const decimalSeparator = lastComma > lastDot ? "," : ".";
    const groupSeparator = decimalSeparator === "," ? "." : ",";

    return value.split(groupSeparator).join("").replace(decimalSeparator, ".");
  }

  if (lastComma !== -1) {
    const parts = value.split(",");
    const lastPart = parts[parts.length - 1];

    if (parts.length > 1 && lastPart.length > 0 && lastPart.length <= 2) {
      return `${parts.slice(0, -1).join("")}.${lastPart}`;
    }

    return parts.join("");
  }

  return value;
}

module.exports = {
  formatCurrency,
  parseCurrency,
};
