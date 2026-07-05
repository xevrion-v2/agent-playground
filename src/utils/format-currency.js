const SYMBOLS = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  CNY: "¥",
  JPY: "¥",
  CAD: "C$",
  AUD: "A$",
};

function normalizeCurrency(code) {
  return String(code || "USD").toUpperCase();
}

function formatCurrency(amount, currency = "USD", options = {}) {
  if (!Number.isFinite(amount)) return "";
  const code = normalizeCurrency(currency);
  const decimals =
    options.decimals ?? (code === "JPY" ? 0 : options.minimumFractionDigits ?? 2);
  const sign = amount < 0 ? "-" : "";
  const abs = Math.abs(amount);
  const formatted = abs.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  const symbol = SYMBOLS[code] || code;
  return `${sign}${symbol}${formatted}`;
}

function parseCurrency(value, currency = "USD") {
  if (value == null) return Number.NaN;
  const text = String(value).trim();
  if (!text) return Number.NaN;
  const code = normalizeCurrency(currency);
  const symbol = SYMBOLS[code] || "";
  let cleaned = text.replace(/,/g, "");
  if (symbol) cleaned = cleaned.replace(symbol, "");
  cleaned = cleaned.replace(/[^0-9.-]/g, "");
  const parsed = Number.parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

module.exports = { formatCurrency, parseCurrency };
