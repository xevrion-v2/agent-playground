/**
 * API Error handling helper
 */

/**
 * Sends a JSON error response.
 * @param {import('express').Response} res
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 */
function apiError(res, statusCode, message) {
  return res.status(statusCode).json({
    error: true,
    status: statusCode,
    message
  });
}

/**
 * Sends a JSON success response.
 * @param {import('express').Response} res
 * @param {*} data - Response payload
 * @param {number} [statusCode=200] - HTTP status code
 */
function apiSuccess(res, data, statusCode = 200) {
  return res.status(statusCode).json({
    error: false,
    data
  });
}

module.exports = { apiError, apiSuccess };
