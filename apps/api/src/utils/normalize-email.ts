/**
 * Dependency-free email normalization helper.
 * Trims and lowercases email inputs before API validation or lookup.
 */

/**
 * Options for email normalization.
 */
export interface NormalizeEmailOptions {
  /** Whether to trim whitespace (default: true) */
  trim?: boolean;
  /** Whether to convert to lowercase (default: true) */
  lowercase?: boolean;
  /** Whether to remove dots from the local part of Gmail addresses (default: false) */
  removeGmailDots?: boolean;
  /** Whether to remove plus addressing (e.g., user+tag@domain.com -> user@domain.com) (default: false) */
  removePlusAddressing?: boolean;
  /** Whether to normalize common domain aliases (e.g., googlemail.com -> gmail.com) (default: false) */
  normalizeDomainAliases?: boolean;
  /** Whether to remove surrounding angle brackets (e.g., <user@domain.com> -> user@domain.com) (default: true) */
  removeAngleBrackets?: boolean;
  /** Whether to remove quotes around the local part (default: true) */
  removeQuotes?: boolean;
  /** Whether to decode percent-encoded characters (default: false) */
  decodePercentEncoding?: boolean;
  /** Default value to return if input is invalid (default: "") */
  defaultValue?: string;
  /** Whether to return null for invalid inputs instead of default value (default: false) */
  returnNullOnInvalid?: boolean;
}

/**
 * Default options for email normalization.
 */
export const DEFAULT_NORMALIZE_EMAIL_OPTIONS: Required<Omit<NormalizeEmailOptions, "defaultValue">> & {
  defaultValue?: string;
} = {
  trim: true,
  lowercase: true,
  removeGmailDots: false,
  removePlusAddressing: false,
  normalizeDomainAliases: false,
  removeAngleBrackets: true,
  removeQuotes: true,
  decodePercentEncoding: false,
  defaultValue: "",
  returnNullOnInvalid: false,
};

/**
 * Common domain aliases mapping.
 */
export const DOMAIN_ALIASES: Record<string, string> = {
  "googlemail.com": "gmail.com",
  "gmail.com": "gmail.com",
  "hotmail.com": "hotmail.com",
  "hotmail.co.uk": "hotmail.co.uk",
  "live.com": "live.com",
  "outlook.com": "outlook.com",
  "msn.com": "msn.com",
  "yahoo.com": "yahoo.com",
  "yahoo.co.uk": "yahoo.co.uk",
  "ymail.com": "ymail.com",
  "rocketmail.com": "rocketmail.com",
  "icloud.com": "icloud.com",
  "me.com": "me.com",
  "mac.com": "mac.com",
  "protonmail.com": "protonmail.com",
  "proton.me": "proton.me",
  "pm.me": "pm.me",
  "zoho.com": "zoho.com",
  "aol.com": "aol.com",
  "mail.com": "mail.com",
  "gmx.com": "gmx.com",
  "gmx.net": "gmx.net",
  "yandex.com": "yandex.com",
  "yandex.ru": "yandex.ru",
  "mail.ru": "mail.ru",
  "bk.ru": "bk.ru",
  "list.ru": "list.ru",
  "inbox.ru": "inbox.ru",
  "qq.com": "qq.com",
  "163.com": "163.com",
  "126.com": "126.com",
  "yeah.net": "yeah.net",
  "sina.com": "sina.com",
  "sina.cn": "sina.cn",
  "sohu.com": "sohu.com",
  "tom.com": "tom.com",
  "21cn.com": "21cn.com",
  "aliyun.com": "aliyun.com",
  "foxmail.com": "foxmail.com",
};

/**
 * Domains that support dot removal in the local part.
 */
export const DOT_REMOVAL_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "protonmail.com",
  "proton.me",
  "pm.me",
]);

/**
 * Domains that support plus addressing.
 */
export const PLUS_ADDRESSING_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "msn.com",
  "yahoo.com",
  "yahoo.co.uk",
  "ymail.com",
  "rocketmail.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "protonmail.com",
  "proton.me",
  "pm.me",
  "zoho.com",
  "aol.com",
  "gmx.com",
  "gmx.net",
  "qq.com",
  "163.com",
  "126.com",
  "yeah.net",
  "aliyun.com",
  "foxmail.com",
]);

/**
 * Basic email validation regex.
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Normalizes an email address by trimming and lowercasing.
 *
 * @param email - The email address to normalize
 * @param options - Normalization options
 * @returns The normalized email address, or default value if invalid
 *
 * @example
 * ```ts
 * normalizeEmail("  User@Example.COM  ") // "user@example.com"
 * normalizeEmail("<user@example.com>") // "user@example.com"
 * normalizeEmail("user.name@gmail.com", { removeGmailDots: true }) // "username@gmail.com"
 * normalizeEmail("user+tag@gmail.com", { removePlusAddressing: true }) // "user@gmail.com"
 * normalizeEmail("user@googlemail.com", { normalizeDomainAliases: true }) // "user@gmail.com"
 * normalizeEmail(null) // ""
 * normalizeEmail("invalid") // ""
 * ```
 */
export function normalizeEmail(
  email: string | null | undefined,
  options: NormalizeEmailOptions = {},
): string {
  const opts = { ...DEFAULT_NORMALIZE_EMAIL_OPTIONS, ...options };

  // Handle null/undefined
  if (email === null || email === undefined) {
    return opts.returnNullOnInvalid ? (null as unknown as string) : (opts.defaultValue ?? "");
  }

  // Handle non-string
  if (typeof email !== "string") {
    return opts.returnNullOnInvalid ? (null as unknown as string) : (opts.defaultValue ?? "");
  }

  let result = email;

  // Remove surrounding angle brackets
  if (opts.removeAngleBrackets) {
    result = result.replace(/^<|>$/g, "");
  }

  // Trim whitespace
  if (opts.trim) {
    result = result.trim();
  }

  // Remove quotes around local part
  if (opts.removeQuotes) {
    result = result.replace(/^"([^"]*)"@/, "$1@");
  }

  // Decode percent-encoded characters
  if (opts.decodePercentEncoding) {
    try {
      result = decodeURIComponent(result);
    } catch {
      // If decoding fails, keep original
    }
  }

  // Convert to lowercase
  if (opts.lowercase) {
    result = result.toLowerCase();
  }

  // Basic validation
  if (!EMAIL_REGEX.test(result)) {
    return opts.returnNullOnInvalid ? (null as unknown as string) : (opts.defaultValue ?? "");
  }

  // Split into local part and domain
  const atIndex = result.lastIndexOf("@");
  let localPart = result.slice(0, atIndex);
  let domain = result.slice(atIndex + 1);

  // Normalize domain aliases
  if (opts.normalizeDomainAliases && DOMAIN_ALIASES[domain]) {
    domain = DOMAIN_ALIASES[domain];
  }

  // Remove dots from Gmail-style addresses
  if (opts.removeGmailDots && DOT_REMOVAL_DOMAINS.has(domain)) {
    localPart = localPart.replace(/\./g, "");
  }

  // Remove plus addressing
  if (opts.removePlusAddressing && PLUS_ADDRESSING_DOMAINS.has(domain)) {
    const plusIndex = localPart.indexOf("+");
    if (plusIndex > 0) {
      localPart = localPart.slice(0, plusIndex);
    }
  }

  // Reconstruct email
  result = `${localPart}@${domain}`;

  // Final validation
  if (!EMAIL_REGEX.test(result)) {
    return opts.returnNullOnInvalid ? (null as unknown as string) : (opts.defaultValue ?? "");
  }

  return result;
}

/**
 * Validates an email address format.
 *
 * @param email - The email address to validate
 * @returns True if the email format is valid, false otherwise
 *
 * @example
 * ```ts
 * isValidEmail("user@example.com") // true
 * isValidEmail("invalid") // false
 * isValidEmail(null) // false
 * ```
 */
export function isValidEmail(email: string | null | undefined): boolean {
  if (email === null || email === undefined || typeof email !== "string") {
    return false;
  }
  return EMAIL_REGEX.test(email.trim().toLowerCase());
}

/**
 * Extracts the domain from an email address.
 *
 * @param email - The email address
 * @returns The domain part, or empty string if invalid
 *
 * @example
 * ```ts
 * getEmailDomain("user@example.com") // "example.com"
 * getEmailDomain("invalid") // ""
 * ```
 */
export function getEmailDomain(email: string | null | undefined): string {
  const normalized = normalizeEmail(email, { returnNullOnInvalid: true });
  if (!normalized) {
    return "";
  }
  const atIndex = normalized.lastIndexOf("@");
  return normalized.slice(atIndex + 1);
}

/**
 * Extracts the local part from an email address.
 *
 * @param email - The email address
 * @returns The local part, or empty string if invalid
 *
 * @example
 * ```ts
 * getEmailLocalPart("user@example.com") // "user"
 * getEmailLocalPart("invalid") // ""
 * ```
 */
export function getEmailLocalPart(email: string | null | undefined): string {
  const normalized = normalizeEmail(email, { returnNullOnInvalid: true });
  if (!normalized) {
    return "";
  }
  const atIndex = normalized.lastIndexOf("@");
  return normalized.slice(0, atIndex);
}

/**
 * Checks if two email addresses are equivalent after normalization.
 *
 * @param email1 - First email address
 * @param email2 - Second email address
 * @param options - Normalization options
 * @returns True if the emails are equivalent, false otherwise
 *
 * @example
 * ```ts
 * emailsEqual("User@Example.COM", "user@example.com") // true
 * emailsEqual("user.name@gmail.com", "username@gmail.com", { removeGmailDots: true }) // true
 * emailsEqual("user+tag@gmail.com", "user@gmail.com", { removePlusAddressing: true }) // true
 * ```
 */
export function emailsEqual(
  email1: string | null | undefined,
  email2: string | null | undefined,
  options: NormalizeEmailOptions = {},
): boolean {
  const normalized1 = normalizeEmail(email1, options);
  const normalized2 = normalizeEmail(email2, options);

  if (!normalized1 || !normalized2) {
    return false;
  }

  return normalized1 === normalized2;
}

/**
 * Masks an email address for display (e.g., "us***@example.com").
 *
 * @param email - The email address to mask
 * @param options - Masking options
 * @returns The masked email address
 *
 * @example
 * ```ts
 * maskEmail("user@example.com") // "u***@example.com"
 * maskEmail("ab@example.com") // "a***@example.com"
 * maskEmail("a@example.com") // "***@example.com"
 * ```
 */
export function maskEmail(
  email: string | null | undefined,
  options: { maskChar?: string; visibleChars?: number } = {},
): string {
  const normalized = normalizeEmail(email, { returnNullOnInvalid: true });
  if (!normalized) {
    return "";
  }

  const maskChar = options.maskChar ?? "*";
  const visibleChars = options.visibleChars ?? 1;

  const atIndex = normalized.lastIndexOf("@");
  const localPart = normalized.slice(0, atIndex);
  const domain = normalized.slice(atIndex + 1);

  if (localPart.length <= visibleChars) {
    return `${maskChar.repeat(3)}@${domain}`;
  }

  const visiblePart = localPart.slice(0, visibleChars);
  return `${visiblePart}${maskChar.repeat(3)}@${domain}`;
}

export default normalizeEmail;
