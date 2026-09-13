/**
 * @typedef {Object} ApiErrorResponseOptions
 * @property {number} [status]
 * @property {string} [message]
 * @property {string} [code]
 * @property {unknown} [details]
 */

/**
 * Standardized API error response helper for Express.
 * @param {import('express').Response} res
 * @param {ApiErrorResponseOptions} [options]
 * @returns {import('express').Response}
 */
export function sendError(res, options = {}) {
  const status = options.status ?? 500;
  const message = options.message ?? "An unexpected error occurred";

  const errorPayload = {
    message,
  };

  if (options.code) {
    errorPayload.code = options.code;
  }

  if (options.details !== undefined) {
    errorPayload.details = options.details;
  }

  return res.status(status).json({
    error: errorPayload,
  });
}
