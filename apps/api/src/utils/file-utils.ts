/**
 * File utility functions for API file handling.
 * Provides common file manipulation helpers for uploads and downloads.
 */

/**
 * File size units in bytes.
 */
export const FileSizeUnit = {
  BYTE: 1,
  KB: 1024,
  MB: 1024 * 1024,
  GB: 1024 * 1024 * 1024,
  TB: 1024 * 1024 * 1024 * 1024,
} as const;

/**
 * Common MIME types.
 */
export const MimeType = {
  // Text
  TEXT_PLAIN: "text/plain",
  TEXT_HTML: "text/html",
  TEXT_CSS: "text/css",
  TEXT_CSV: "text/csv",
  TEXT_XML: "text/xml",
  // Application
  APPLICATION_JSON: "application/json",
  APPLICATION_XML: "application/xml",
  APPLICATION_PDF: "application/pdf",
  APPLICATION_ZIP: "application/zip",
  APPLICATION_GZIP: "application/gzip",
  APPLICATION_TAR: "application/x-tar",
  APPLICATION_OCTET_STREAM: "application/octet-stream",
  APPLICATION_JAVASCRIPT: "application/javascript",
  APPLICATION_X_WWW_FORM_URLENCODED: "application/x-www-form-urlencoded",
  // Image
  IMAGE_JPEG: "image/jpeg",
  IMAGE_PNG: "image/png",
  IMAGE_GIF: "image/gif",
  IMAGE_WEBP: "image/webp",
  IMAGE_SVG: "image/svg+xml",
  IMAGE_BMP: "image/bmp",
  IMAGE_TIFF: "image/tiff",
  IMAGE_ICO: "image/x-icon",
  // Audio
  AUDIO_MPEG: "audio/mpeg",
  AUDIO_WAV: "audio/wav",
  AUDIO_OGG: "audio/ogg",
  AUDIO_FLAC: "audio/flac",
  AUDIO_AAC: "audio/aac",
  AUDIO_WEBM: "audio/webm",
  // Video
  VIDEO_MP4: "video/mp4",
  VIDEO_WEBM: "video/webm",
  VIDEO_OGG: "video/ogg",
  VIDEO_AVI: "video/x-msvideo",
  VIDEO_MKV: "video/x-matroska",
  VIDEO_MOV: "video/quicktime",
  // Font
  FONT_TTF: "font/ttf",
  FONT_OTF: "font/otf",
  FONT_WOFF: "font/woff",
  FONT_WOFF2: "font/woff2",
} as const;

/**
 * File extension to MIME type mapping.
 */
export const EXTENSION_TO_MIME: Record<string, string> = {
  // Text
  txt: MimeType.TEXT_PLAIN,
  html: MimeType.TEXT_HTML,
  htm: MimeType.TEXT_HTML,
  css: MimeType.TEXT_CSS,
  csv: MimeType.TEXT_CSV,
  xml: MimeType.TEXT_XML,
  // Application
  json: MimeType.APPLICATION_JSON,
  pdf: MimeType.APPLICATION_PDF,
  zip: MimeType.APPLICATION_ZIP,
  gz: MimeType.APPLICATION_GZIP,
  tar: MimeType.APPLICATION_TAR,
  js: MimeType.APPLICATION_JAVASCRIPT,
  mjs: MimeType.APPLICATION_JAVASCRIPT,
  // Image
  jpg: MimeType.IMAGE_JPEG,
  jpeg: MimeType.IMAGE_JPEG,
  png: MimeType.IMAGE_PNG,
  gif: MimeType.IMAGE_GIF,
  webp: MimeType.IMAGE_WEBP,
  svg: MimeType.IMAGE_SVG,
  bmp: MimeType.IMAGE_BMP,
  tiff: MimeType.IMAGE_TIFF,
  tif: MimeType.IMAGE_TIFF,
  ico: MimeType.IMAGE_ICO,
  // Audio
  mp3: MimeType.AUDIO_MPEG,
  wav: MimeType.AUDIO_WAV,
  ogg: MimeType.AUDIO_OGG,
  flac: MimeType.AUDIO_FLAC,
  aac: MimeType.AUDIO_AAC,
  // Video
  mp4: MimeType.VIDEO_MP4,
  webm: MimeType.VIDEO_WEBM,
  avi: MimeType.VIDEO_AVI,
  mkv: MimeType.VIDEO_MKV,
  mov: MimeType.VIDEO_MOV,
  // Font
  ttf: MimeType.FONT_TTF,
  otf: MimeType.FONT_OTF,
  woff: MimeType.FONT_WOFF,
  woff2: MimeType.FONT_WOFF2,
};

/**
 * MIME type to file extension mapping.
 */
export const MIME_TO_EXTENSION: Record<string, string> = Object.entries(
  EXTENSION_TO_MIME,
).reduce((acc, [ext, mime]) => {
  if (!acc[mime]) {
    acc[mime] = ext;
  }
  return acc;
}, {} as Record<string, string>);

/**
 * Gets the file extension from a filename.
 *
 * @param filename - The filename
 * @returns The file extension (lowercase, without dot), or empty string
 *
 * @example
 * ```ts
 * getExtension("file.txt") // "txt"
 * getExtension("archive.tar.gz") // "gz"
 * getExtension("noextension") // ""
 * ```
 */
export function getExtension(filename: string): string {
  if (typeof filename !== "string" || !filename) return "";
  const lastDot = filename.lastIndexOf(".");
  if (lastDot === -1 || lastDot === filename.length - 1) return "";
  return filename.slice(lastDot + 1).toLowerCase();
}

/**
 * Gets the filename without extension.
 *
 * @param filename - The filename
 * @returns The filename without extension
 *
 * @example
 * ```ts
 * getBasename("file.txt") // "file"
 * getBasename("archive.tar.gz") // "archive.tar"
 * getBasename("noextension") // "noextension"
 * ```
 */
export function getBasename(filename: string): string {
  if (typeof filename !== "string" || !filename) return "";
  const lastDot = filename.lastIndexOf(".");
  if (lastDot === -1) return filename;
  return filename.slice(0, lastDot);
}

/**
 * Gets the MIME type from a filename.
 *
 * @param filename - The filename
 * @returns The MIME type, or "application/octet-stream" if unknown
 *
 * @example
 * ```ts
 * getMimeType("file.txt") // "text/plain"
 * getMimeType("image.png") // "image/png"
 * getMimeType("unknown.xyz") // "application/octet-stream"
 * ```
 */
export function getMimeType(filename: string): string {
  const ext = getExtension(filename);
  return EXTENSION_TO_MIME[ext] ?? MimeType.APPLICATION_OCTET_STREAM;
}

/**
 * Gets the file extension from a MIME type.
 *
 * @param mimeType - The MIME type
 * @returns The file extension, or empty string if unknown
 *
 * @example
 * ```ts
 * getExtensionFromMime("text/plain") // "txt"
 * getExtensionFromMime("image/png") // "png"
 * ```
 */
export function getExtensionFromMime(mimeType: string): string {
  if (typeof mimeType !== "string" || !mimeType) return "";
  return MIME_TO_EXTENSION[mimeType.toLowerCase()] ?? "";
}

/**
 * Formats a file size in bytes to a human-readable string.
 *
 * @param bytes - The file size in bytes
 * @param decimals - The number of decimal places (default: 2)
 * @returns The formatted file size string
 *
 * @example
 * ```ts
 * formatFileSize(1024) // "1.00 KB"
 * formatFileSize(1048576) // "1.00 MB"
 * formatFileSize(500) // "500 B"
 * formatFileSize(1073741824) // "1.00 GB"
 * ```
 */
export function formatFileSize(bytes: number, decimals = 2): string {
  if (typeof bytes !== "number" || isNaN(bytes) || bytes < 0) return "0 B";
  if (bytes === 0) return "0 B";

  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const size = sizes[Math.min(i, sizes.length - 1)];
  const value = bytes / Math.pow(k, Math.min(i, sizes.length - 1));

  return `${value.toFixed(decimals)} ${size}`;
}

/**
 * Parses a human-readable file size string to bytes.
 *
 * @param sizeStr - The file size string (e.g., "1.5 MB", "500KB", "2GB")
 * @returns The file size in bytes, or 0 if invalid
 *
 * @example
 * ```ts
 * parseFileSize("1.5 MB") // 1572864
 * parseFileSize("500KB") // 512000
 * parseFileSize("2GB") // 2147483648
 * parseFileSize("invalid") // 0
 * ```
 */
export function parseFileSize(sizeStr: string): number {
  if (typeof sizeStr !== "string" || !sizeStr) return 0;

  const match = sizeStr.trim().match(/^([\d.]+)\s*(B|KB|MB|GB|TB|PB)?$/i);
  if (!match) return 0;

  const value = parseFloat(match[1]);
  if (isNaN(value)) return 0;

  const unit = (match[2] ?? "B").toUpperCase();
  const multipliers: Record<string, number> = {
    B: 1,
    KB: FileSizeUnit.KB,
    MB: FileSizeUnit.MB,
    GB: FileSizeUnit.GB,
    TB: FileSizeUnit.TB,
    PB: FileSizeUnit.TB * 1024,
  };

  return Math.round(value * (multipliers[unit] ?? 1));
}

/**
 * Checks if a file size is within a limit.
 *
 * @param bytes - The file size in bytes
 * @param maxSize - The maximum allowed size (in bytes or as a string)
 * @returns True if the file size is within the limit, false otherwise
 *
 * @example
 * ```ts
 * isFileSizeAllowed(500000, "1MB") // true
 * isFileSizeAllowed(2000000, "1MB") // false
 * isFileSizeAllowed(500000, 1048576) // true
 * ```
 */
export function isFileSizeAllowed(bytes: number, maxSize: number | string): boolean {
  if (typeof bytes !== "number" || isNaN(bytes) || bytes < 0) return false;
  const limit = typeof maxSize === "string" ? parseFileSize(maxSize) : maxSize;
  return bytes <= limit;
}

/**
 * Checks if a filename has an allowed extension.
 *
 * @param filename - The filename
 * @param allowedExtensions - The allowed extensions (without dots)
 * @returns True if the extension is allowed, false otherwise
 *
 * @example
 * ```ts
 * isExtensionAllowed("image.png", ["jpg", "png", "gif"]) // true
 * isExtensionAllowed("file.exe", ["jpg", "png"]) // false
 * ```
 */
export function isExtensionAllowed(filename: string, allowedExtensions: string[]): boolean {
  if (!Array.isArray(allowedExtensions) || allowedExtensions.length === 0) return true;
  const ext = getExtension(filename);
  return allowedExtensions.map((e) => e.toLowerCase()).includes(ext);
}

/**
 * Checks if a file has an allowed MIME type.
 *
 * @param mimeType - The MIME type
 * @param allowedMimeTypes - The allowed MIME types
 * @returns True if the MIME type is allowed, false otherwise
 *
 * @example
 * ```ts
 * isMimeTypeAllowed("image/png", ["image/jpeg", "image/png"]) // true
 * isMimeTypeAllowed("application/pdf", ["image/jpeg", "image/png"]) // false
 * ```
 */
export function isMimeTypeAllowed(mimeType: string, allowedMimeTypes: string[]): boolean {
  if (!Array.isArray(allowedMimeTypes) || allowedMimeTypes.length === 0) return true;
  if (typeof mimeType !== "string" || !mimeType) return false;
  return allowedMimeTypes.map((m) => m.toLowerCase()).includes(mimeType.toLowerCase());
}

/**
 * Checks if a file is an image.
 *
 * @param filenameOrMime - The filename or MIME type
 * @returns True if the file is an image, false otherwise
 *
 * @example
 * ```ts
 * isImage("image.png") // true
 * isImage("image/png") // true (MIME type)
 * isImage("file.txt") // false
 * ```
 */
export function isImage(filenameOrMime: string): boolean {
  if (typeof filenameOrMime !== "string" || !filenameOrMime) return false;
  const mime = filenameOrMime.includes("/")
    ? filenameOrMime
    : getMimeType(filenameOrMime);
  return mime.startsWith("image/");
}

/**
 * Checks if a file is a video.
 *
 * @param filenameOrMime - The filename or MIME type
 * @returns True if the file is a video, false otherwise
 */
export function isVideo(filenameOrMime: string): boolean {
  if (typeof filenameOrMime !== "string" || !filenameOrMime) return false;
  const mime = filenameOrMime.includes("/")
    ? filenameOrMime
    : getMimeType(filenameOrMime);
  return mime.startsWith("video/");
}

/**
 * Checks if a file is audio.
 *
 * @param filenameOrMime - The filename or MIME type
 * @returns True if the file is audio, false otherwise
 */
export function isAudio(filenameOrMime: string): boolean {
  if (typeof filenameOrMime !== "string" || !filenameOrMime) return false;
  const mime = filenameOrMime.includes("/")
    ? filenameOrMime
    : getMimeType(filenameOrMime);
  return mime.startsWith("audio/");
}

/**
 * Checks if a file is a PDF.
 *
 * @param filenameOrMime - The filename or MIME type
 * @returns True if the file is a PDF, false otherwise
 */
export function isPDF(filenameOrMime: string): boolean {
  if (typeof filenameOrMime !== "string" || !filenameOrMime) return false;
  const mime = filenameOrMime.includes("/")
    ? filenameOrMime
    : getMimeType(filenameOrMime);
  return mime === MimeType.APPLICATION_PDF;
}

/**
 * Checks if a file is a document (PDF, text, Word, etc.).
 *
 * @param filenameOrMime - The filename or MIME type
 * @returns True if the file is a document, false otherwise
 */
export function isDocument(filenameOrMime: string): boolean {
  if (typeof filenameOrMime !== "string" || !filenameOrMime) return false;
  const mime = filenameOrMime.includes("/")
    ? filenameOrMime
    : getMimeType(filenameOrMime);
  return (
    mime.startsWith("text/") ||
    mime === MimeType.APPLICATION_PDF ||
    mime === MimeType.APPLICATION_JSON ||
    mime === MimeType.APPLICATION_XML ||
    mime === MimeType.APPLICATION_JAVASCRIPT
  );
}

/**
 * Sanitizes a filename by removing or replacing unsafe characters.
 *
 * @param filename - The original filename
 * @param replacement - The replacement character for unsafe chars (default: "_")
 * @returns The sanitized filename
 *
 * @example
 * ```ts
 * sanitizeFilename("my file (1).txt") // "my_file_(1).txt"
 * sanitizeFilename("file<>name?.txt") // "file_name_.txt"
 * ```
 */
export function sanitizeFilename(filename: string, replacement = "_"): string {
  if (typeof filename !== "string" || !filename) return "";
  // Remove or replace characters that are unsafe for filenames
  return filename
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, replacement)
    .replace(/\s+/g, replacement)
    .replace(/\.+$/, "") // Remove trailing dots
    .slice(0, 255); // Max filename length
}

/**
 * Generates a unique filename by appending a timestamp or random string.
 *
 * @param filename - The original filename
 * @param strategy - The strategy to use ("timestamp" or "random", default: "timestamp")
 * @returns The unique filename
 *
 * @example
 * ```ts
 * generateUniqueFilename("file.txt") // "file_1694500000000.txt"
 * generateUniqueFilename("image.png", "random") // "image_a1b2c3d4.png"
 * ```
 */
export function generateUniqueFilename(
  filename: string,
  strategy: "timestamp" | "random" = "timestamp",
): string {
  if (typeof filename !== "string" || !filename) return "";
  const ext = getExtension(filename);
  const basename = getBasename(filename);
  const suffix =
    strategy === "timestamp"
      ? Date.now().toString()
      : Math.random().toString(36).slice(2, 10);

  return ext ? `${basename}_${suffix}.${ext}` : `${basename}_${suffix}`;
}

/**
 * Converts a file size in bytes to a specific unit.
 *
 * @param bytes - The file size in bytes
 * @param unit - The target unit ("B", "KB", "MB", "GB", "TB")
 * @returns The file size in the target unit
 *
 * @example
 * ```ts
 * convertFileSize(1048576, "MB") // 1
 * convertFileSize(1024, "KB") // 1
 * convertFileSize(1073741824, "GB") // 1
 * ```
 */
export function convertFileSize(
  bytes: number,
  unit: "B" | "KB" | "MB" | "GB" | "TB",
): number {
  if (typeof bytes !== "number" || isNaN(bytes) || bytes < 0) return 0;
  const units: Record<string, number> = {
    B: FileSizeUnit.BYTE,
    KB: FileSizeUnit.KB,
    MB: FileSizeUnit.MB,
    GB: FileSizeUnit.GB,
    TB: FileSizeUnit.TB,
  };
  return bytes / (units[unit] ?? 1);
}

export default {
  FileSizeUnit,
  MimeType,
  EXTENSION_TO_MIME,
  MIME_TO_EXTENSION,
  getExtension,
  getBasename,
  getMimeType,
  getExtensionFromMime,
  formatFileSize,
  parseFileSize,
  isFileSizeAllowed,
  isExtensionAllowed,
  isMimeTypeAllowed,
  isImage,
  isVideo,
  isAudio,
  isPDF,
  isDocument,
  sanitizeFilename,
  generateUniqueFilename,
  convertFileSize,
};
