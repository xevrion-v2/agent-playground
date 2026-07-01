'use strict';

const DEFAULT_MAX_LENGTH = 80;
const DEFAULT_ELLIPSIS = '...';

function normalizeMaxLength(maxLength) {
  if (maxLength === undefined) {
    return DEFAULT_MAX_LENGTH;
  }

  const numericLength = Number(maxLength);
  if (!Number.isFinite(numericLength) || numericLength < 0) {
    return DEFAULT_MAX_LENGTH;
  }

  return Math.floor(numericLength);
}

function normalizeEllipsis(ellipsis) {
  if (ellipsis === undefined) {
    return DEFAULT_ELLIPSIS;
  }

  if (ellipsis === null) {
    return '';
  }

  return String(ellipsis);
}

function truncate(value, options = {}) {
  if (value === null || value === undefined) {
    return '';
  }

  const input = String(value);
  if (input.length === 0) {
    return '';
  }

  const maxLength = normalizeMaxLength(options.maxLength);
  const ellipsis = normalizeEllipsis(options.ellipsis);

  if (maxLength === 0) {
    return '';
  }

  if (input.length <= maxLength) {
    return input;
  }

  if (ellipsis.length >= maxLength) {
    return ellipsis.slice(0, maxLength);
  }

  return `${input.slice(0, maxLength - ellipsis.length)}${ellipsis}`;
}

module.exports = { truncate };
