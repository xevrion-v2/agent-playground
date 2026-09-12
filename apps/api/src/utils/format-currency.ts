/**
 * Dependency-free currency formatting helper for API responses and displays.
 * Formats monetary values without external dependencies.
 */

/**
 * Currency information.
 */
export interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
  decimals: number;
  symbolPosition: "before" | "after";
  thousandsSeparator: string;
  decimalSeparator: string;
  spaceBetween: boolean;
}

/**
 * Options for currency formatting.
 */
export interface FormatCurrencyOptions {
  /** Currency code (default: "USD") */
  currency?: string;
  /** Number of decimal places (default: currency's default) */
  decimals?: number;
  /** Include currency symbol (default: true) */
  includeSymbol?: boolean;
  /** Include currency code (default: false) */
  includeCode?: boolean;
  /** Use parentheses for negative values (default: false) */
  useParentheses?: boolean;
  /** Show plus sign for positive values (default: false) */
  showPlusSign?: boolean;
  /** Thousands separator (default: currency's default) */
  thousandsSeparator?: string;
  /** Decimal separator (default: currency's default) */
  decimalSeparator?: string;
  /** Custom symbol (overrides currency symbol) */
  symbol?: string;
  /** Symbol position (default: currency's default) */
  symbolPosition?: "before" | "after";
  /** Space between symbol and number (default: currency's default) */
  spaceBetween?: boolean;
  /** Compact format (e.g., "1.5K" instead of "1,500") (default: false) */
  compact?: boolean;
  /** Compact threshold (default: 1000) */
  compactThreshold?: number;
}

/**
 * Common currency definitions.
 */
export const CURRENCIES: Record<string, CurrencyInfo> = {
  USD: {
    code: "USD",
    symbol: "$",
    name: "US Dollar",
    decimals: 2,
    symbolPosition: "before",
    thousandsSeparator: ",",
    decimalSeparator: ".",
    spaceBetween: false,
  },
  EUR: {
    code: "EUR",
    symbol: "€",
    name: "Euro",
    decimals: 2,
    symbolPosition: "after",
    thousandsSeparator: ".",
    decimalSeparator: ",",
    spaceBetween: true,
  },
  GBP: {
    code: "GBP",
    symbol: "£",
    name: "British Pound",
    decimals: 2,
    symbolPosition: "before",
    thousandsSeparator: ",",
    decimalSeparator: ".",
    spaceBetween: false,
  },
  CNY: {
    code: "CNY",
    symbol: "¥",
    name: "Chinese Yuan",
    decimals: 2,
    symbolPosition: "before",
    thousandsSeparator: ",",
    decimalSeparator: ".",
    spaceBetween: false,
  },
  JPY: {
    code: "JPY",
    symbol: "¥",
    name: "Japanese Yen",
    decimals: 0,
    symbolPosition: "before",
    thousandsSeparator: ",",
    decimalSeparator: ".",
    spaceBetween: false,
  },
  AUD: {
    code: "AUD",
    symbol: "A$",
    name: "Australian Dollar",
    decimals: 2,
    symbolPosition: "before",
    thousandsSeparator: ",",
    decimalSeparator: ".",
    spaceBetween: false,
  },
  CAD: {
    code: "CAD",
    symbol: "C$",
    name: "Canadian Dollar",
    decimals: 2,
    symbolPosition: "before",
    thousandsSeparator: ",",
    decimalSeparator: ".",
    spaceBetween: false,
  },
  CHF: {
    code: "CHF",
    symbol: "CHF",
    name: "Swiss Franc",
    decimals: 2,
    symbolPosition: "before",
    thousandsSeparator: "'",
    decimalSeparator: ".",
    spaceBetween: true,
  },
  HKD: {
    code: "HKD",
    symbol: "HK$",
    name: "Hong Kong Dollar",
    decimals: 2,
    symbolPosition: "before",
    thousandsSeparator: ",",
    decimalSeparator: ".",
    spaceBetween: false,
  },
  SGD: {
    code: "SGD",
    symbol: "S$",
    name: "Singapore Dollar",
    decimals: 2,
    symbolPosition: "before",
    thousandsSeparator: ",",
    decimalSeparator: ".",
    spaceBetween: false,
  },
  INR: {
    code: "INR",
    symbol: "₹",
    name: "Indian Rupee",
    decimals: 2,
    symbolPosition: "before",
    thousandsSeparator: ",",
    decimalSeparator: ".",
    spaceBetween: false,
  },
  KRW: {
    code: "KRW",
    symbol: "₩",
    name: "South Korean Won",
    decimals: 0,
    symbolPosition: "before",
    thousandsSeparator: ",",
    decimalSeparator: ".",
    spaceBetween: false,
  },
  MXN: {
    code: "MXN",
    symbol: "Mex$",
    name: "Mexican Peso",
    decimals: 2,
    symbolPosition: "before",
    thousandsSeparator: ",",
    decimalSeparator: ".",
    spaceBetween: false,
  },
  BRL: {
    code: "BRL",
    symbol: "R$",
    name: "Brazilian Real",
    decimals: 2,
    symbolPosition: "before",
    thousandsSeparator: ".",
    decimalSeparator: ",",
    spaceBetween: true,
  },
  RUB: {
    code: "RUB",
    symbol: "₽",
    name: "Russian Ruble",
    decimals: 2,
    symbolPosition: "after",
    thousandsSeparator: " ",
    decimalSeparator: ",",
    spaceBetween: true,
  },
  ZAR: {
    code: "ZAR",
    symbol: "R",
    name: "South African Rand",
    decimals: 2,
    symbolPosition: "before",
    thousandsSeparator: " ",
    decimalSeparator: ",",
    spaceBetween: true,
  },
  SEK: {
    code: "SEK",
    symbol: "kr",
    name: "Swedish Krona",
    decimals: 2,
    symbolPosition: "after",
    thousandsSeparator: " ",
    decimalSeparator: ",",
    spaceBetween: true,
  },
  NOK: {
    code: "NOK",
    symbol: "kr",
    name: "Norwegian Krone",
    decimals: 2,
    symbolPosition: "after",
    thousandsSeparator: " ",
    decimalSeparator: ",",
    spaceBetween: true,
  },
  DKK: {
    code: "DKK",
    symbol: "kr",
    name: "Danish Krone",
    decimals: 2,
    symbolPosition: "after",
    thousandsSeparator: ".",
    decimalSeparator: ",",
    spaceBetween: true,
  },
  NZD: {
    code: "NZD",
    symbol: "NZ$",
    name: "New Zealand Dollar",
    decimals: 2,
    symbolPosition: "before",
    thousandsSeparator: ",",
    decimalSeparator: ".",
    spaceBetween: false,
  },
  TRY: {
    code: "TRY",
    symbol: "₺",
    name: "Turkish Lira",
    decimals: 2,
    symbolPosition: "before",
    thousandsSeparator: ".",
    decimalSeparator: ",",
    spaceBetween: false,
  },
  PLN: {
    code: "PLN",
    symbol: "zł",
    name: "Polish Zloty",
    decimals: 2,
    symbolPosition: "after",
    thousandsSeparator: " ",
    decimalSeparator: ",",
    spaceBetween: true,
  },
  THB: {
    code: "THB",
    symbol: "฿",
    name: "Thai Baht",
    decimals: 2,
    symbolPosition: "before",
    thousandsSeparator: ",",
    decimalSeparator: ".",
    spaceBetween: false,
  },
  MYR: {
    code: "MYR",
    symbol: "RM",
    name: "Malaysian Ringgit",
    decimals: 2,
    symbolPosition: "before",
    thousandsSeparator: ",",
    decimalSeparator: ".",
    spaceBetween: true,
  },
  PHP: {
    code: "PHP",
    symbol: "₱",
    name: "Philippine Peso",
    decimals: 2,
    symbolPosition: "before",
    thousandsSeparator: ",",
    decimalSeparator: ".",
    spaceBetween: false,
  },
  IDR: {
    code: "IDR",
    symbol: "Rp",
    name: "Indonesian Rupiah",
    decimals: 0,
    symbolPosition: "before",
    thousandsSeparator: ".",
    decimalSeparator: ",",
    spaceBetween: true,
  },
  VND: {
    code: "VND",
    symbol: "₫",
    name: "Vietnamese Dong",
    decimals: 0,
    symbolPosition: "after",
    thousandsSeparator: ".",
    decimalSeparator: ",",
    spaceBetween: true,
  },
  AED: {
    code: "AED",
    symbol: "د.إ",
    name: "UAE Dirham",
    decimals: 2,
    symbolPosition: "before",
    thousandsSeparator: ",",
    decimalSeparator: ".",
    spaceBetween: true,
  },
  SAR: {
    code: "SAR",
    symbol: "﷼",
    name: "Saudi Riyal",
    decimals: 2,
    symbolPosition: "before",
    thousandsSeparator: ",",
    decimalSeparator: ".",
    spaceBetween: true,
  },
  BTC: {
    code: "BTC",
    symbol: "₿",
    name: "Bitcoin",
    decimals: 8,
    symbolPosition: "before",
    thousandsSeparator: ",",
    decimalSeparator: ".",
    spaceBetween: true,
  },
  ETH: {
    code: "ETH",
    symbol: "Ξ",
    name: "Ethereum",
    decimals: 18,
    symbolPosition: "before",
    thousandsSeparator: ",",
    decimalSeparator: ".",
    spaceBetween: true,
  },
};

/**
 * Default currency formatting options.
 */
export const DEFAULT_FORMAT_CURRENCY_OPTIONS: Required<Omit<FormatCurrencyOptions, "decimals" | "symbol" | "thousandsSeparator" | "decimalSeparator" | "symbolPosition" | "spaceBetween" | "compactThreshold">> & {
  decimals?: number;
  symbol?: string;
  thousandsSeparator?: string;
  decimalSeparator?: string;
  symbolPosition?: "before" | "after";
  spaceBetween?: boolean;
  compactThreshold?: number;
} = {
  currency: "USD",
  includeSymbol: true,
  includeCode: false,
  useParentheses: false,
  showPlusSign: false,
  compact: false,
};

/**
 * Compact number suffixes.
 */
const COMPACT_SUFFIXES = [
  { value: 1e12, suffix: "T" },
  { value: 1e9, suffix: "B" },
  { value: 1e6, suffix: "M" },
  { value: 1e3, suffix: "K" },
];

/**
 * Formats a number with thousands and decimal separators.
 */
function formatNumber(
  value: number,
  decimals: number,
  thousandsSeparator: string,
  decimalSeparator: string,
): string {
  const fixed = value.toFixed(decimals);
  const [integerPart, decimalPart] = fixed.split(".");

  const formattedInteger = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    thousandsSeparator,
  );

  if (decimals > 0 && decimalPart) {
    return `${formattedInteger}${decimalSeparator}${decimalPart}`;
  }

  return formattedInteger;
}

/**
 * Formats a number in compact form (e.g., "1.5K" instead of "1,500").
 */
function formatCompact(
  value: number,
  decimals: number,
  thousandsSeparator: string,
  decimalSeparator: string,
  threshold: number,
): string {
  const absValue = Math.abs(value);

  if (absValue < threshold) {
    return formatNumber(value, decimals, thousandsSeparator, decimalSeparator);
  }

  for (const { value: suffixValue, suffix } of COMPACT_SUFFIXES) {
    if (absValue >= suffixValue) {
      const compactValue = value / suffixValue;
      const compactDecimals = compactValue >= 100 ? 0 : compactValue >= 10 ? 1 : 2;
      return `${formatNumber(compactValue, compactDecimals, thousandsSeparator, decimalSeparator)}${suffix}`;
    }
  }

  return formatNumber(value, decimals, thousandsSeparator, decimalSeparator);
}

/**
 * Formats a monetary value as a currency string.
 *
 * @param amount - The monetary amount to format
 * @param options - Formatting options
 * @returns The formatted currency string
 *
 * @example
 * ```ts
 * formatCurrency(1234.56) // "$1,234.56"
 * formatCurrency(1234.56, { currency: "EUR" }) // "1.234,56 €"
 * formatCurrency(-1234.56, { useParentheses: true }) // "($1,234.56)"
 * formatCurrency(1500, { compact: true }) // "$1.5K"
 * formatCurrency(1234.56, { includeCode: true }) // "$1,234.56 USD"
 * formatCurrency(1234.56, { decimals: 0 }) // "$1,235"
 * ```
 */
export function formatCurrency(
  amount: number,
  options: FormatCurrencyOptions = {},
): string {
  const opts = { ...DEFAULT_FORMAT_CURRENCY_OPTIONS, ...options };
  const currencyCode = opts.currency?.toUpperCase() ?? "USD";
  const currency = CURRENCIES[currencyCode] ?? CURRENCIES.USD;

  const decimals = opts.decimals ?? currency.decimals;
  const symbol = opts.symbol ?? currency.symbol;
  const symbolPosition = opts.symbolPosition ?? currency.symbolPosition;
  const spaceBetween = opts.spaceBetween ?? currency.spaceBetween;
  const thousandsSeparator = opts.thousandsSeparator ?? currency.thousandsSeparator;
  const decimalSeparator = opts.decimalSeparator ?? currency.decimalSeparator;
  const compactThreshold = opts.compactThreshold ?? 1000;

  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);

  let formattedNumber: string;
  if (opts.compact) {
    formattedNumber = formatCompact(
      absAmount,
      decimals,
      thousandsSeparator,
      decimalSeparator,
      compactThreshold,
    );
  } else {
    formattedNumber = formatNumber(
      absAmount,
      decimals,
      thousandsSeparator,
      decimalSeparator,
    );
  }

  const space = spaceBetween ? " " : "";
  let result: string;

  if (symbolPosition === "before") {
    result = `${symbol}${space}${formattedNumber}`;
  } else {
    result = `${formattedNumber}${space}${symbol}`;
  }

  if (opts.includeCode) {
    result = `${result} ${currencyCode}`;
  }

  if (isNegative) {
    if (opts.useParentheses) {
      result = `(${result})`;
    } else {
      result = `-${result}`;
    }
  } else if (opts.showPlusSign && amount > 0) {
    result = `+${result}`;
  }

  return result;
}

/**
 * Parses a currency string back to a number.
 *
 * @param currencyString - The currency string to parse
 * @param options - Parsing options
 * @returns The parsed numeric value
 *
 * @example
 * ```ts
 * parseCurrency("$1,234.56") // 1234.56
 * parseCurrency("1.234,56 €") // 1234.56
 * parseCurrency("($1,234.56)") // -1234.56
 * ```
 */
export function parseCurrency(
  currencyString: string,
  options: { decimalSeparator?: string; thousandsSeparator?: string } = {},
): number {
  if (typeof currencyString !== "string") {
    return 0;
  }

  const decimalSeparator = options.decimalSeparator ?? ".";
  const thousandsSeparator = options.thousandsSeparator ?? ",";

  let cleaned = currencyString.trim();

  // Check for parentheses (negative)
  const isParenthesesNegative = cleaned.startsWith("(") && cleaned.endsWith(")");
  if (isParenthesesNegative) {
    cleaned = cleaned.slice(1, -1);
  }

  // Remove currency symbols and codes
  cleaned = cleaned.replace(/[^\d.,\-+\s]/g, "").trim();

  // Remove thousands separators
  if (thousandsSeparator !== ".") {
    cleaned = cleaned.split(thousandsSeparator).join("");
  } else {
    // If thousands separator is ".", remove dots that are followed by 3 digits
    cleaned = cleaned.replace(/\.(?=\d{3}(\D|$))/g, "");
  }

  // Normalize decimal separator
  if (decimalSeparator !== ".") {
    cleaned = cleaned.split(decimalSeparator).join(".");
  }

  const value = parseFloat(cleaned);

  if (isNaN(value)) {
    return 0;
  }

  return isParenthesesNegative ? -value : value;
}

/**
 * Converts an amount from one currency to another using a given exchange rate.
 *
 * @param amount - The amount to convert
 * @param fromCurrency - The source currency code
 * @param toCurrency - The target currency code
 * @param exchangeRate - The exchange rate (1 fromCurrency = exchangeRate toCurrency)
 * @returns The converted amount
 *
 * @example
 * ```ts
 * convertCurrency(100, "USD", "EUR", 0.85) // 85
 * convertCurrency(100, "EUR", "USD", 1.18) // 118
 * ```
 */
export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  exchangeRate: number,
): number {
  if (typeof amount !== "number" || isNaN(amount)) {
    return 0;
  }

  if (typeof exchangeRate !== "number" || isNaN(exchangeRate) || exchangeRate <= 0) {
    return amount;
  }

  if (fromCurrency.toUpperCase() === toCurrency.toUpperCase()) {
    return amount;
  }

  return amount * exchangeRate;
}

/**
 * Gets currency information for a given currency code.
 *
 * @param currencyCode - The currency code
 * @returns The currency information, or undefined if not found
 *
 * @example
 * ```ts
 * getCurrencyInfo("USD") // { code: "USD", symbol: "$", name: "US Dollar", ... }
 * getCurrencyInfo("INVALID") // undefined
 * ```
 */
export function getCurrencyInfo(currencyCode: string): CurrencyInfo | undefined {
  return CURRENCIES[currencyCode.toUpperCase()];
}

/**
 * Checks if a currency code is supported.
 *
 * @param currencyCode - The currency code to check
 * @returns True if the currency is supported, false otherwise
 *
 * @example
 * ```ts
 * isSupportedCurrency("USD") // true
 * isSupportedCurrency("INVALID") // false
 * ```
 */
export function isSupportedCurrency(currencyCode: string): boolean {
  return currencyCode.toUpperCase() in CURRENCIES;
}

/**
 * Gets all supported currency codes.
 *
 * @returns An array of supported currency codes
 *
 * @example
 * ```ts
 * getSupportedCurrencies() // ["USD", "EUR", "GBP", ...]
 * ```
 */
export function getSupportedCurrencies(): string[] {
  return Object.keys(CURRENCIES);
}

export default formatCurrency;
