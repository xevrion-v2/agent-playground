javascript
// src/utils/errorHelper.js

const { v4: uuidv4 } = require('uuid');
const logger = require('../config/logger');

/**
 * Custom application error class with HTTP status code support.
 * @extends Error
 */
class AppError extends Error {
  /** @type {number} */
  statusCode;

  /** @type {string|undefined} */
  errorCode;

  /** @type {object|string|null} */
  details;

  /** @type {string} */
  requestId;

  /** @type {boolean} */
  isOperational;

  /**
   * @param {number} statusCode - HTTP status code
   * @param {string} message - Error message
   * @param {object|string|null} [details=null] - Additional error details
   * @param {string} [errorCode] - Application-specific error code
   */
  constructor(statusCode, message, details = null, errorCode) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.details = details;
    this.errorCode = errorCode;
    this.requestId = uuidv4();
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Validates HTTP status code.
 * @param {unknown} statusCode - Value to validate
 * @returns {boolean} True if valid status code
 */
function isValidStatusCode(statusCode) {
  return typeof statusCode === 'number' && 
         Number.isInteger(statusCode) && 
         statusCode >= 100 && 
         statusCode <= 599;
}

/**
 * Validates error message.
 * @param {unknown} message - Value to validate
 * @returns {boolean} True if valid message
 */
function isValidMessage(message) {
  return typeof message === 'string' && message.trim().length > 0;
}

/**
 * Sanitizes error details to prevent sensitive data leakage.
 * @param {unknown} details - Raw error details
 * @returns {object|null} Sanitized details object
 */
function sanitizeDetails(details) {
  if (details === null || details === undefined) {
    return null;
  }

  const sensitiveKeys = ['password', 'token', 'secret', 'authorization', 'cookie', 'creditcard', 'ssn'];
  
  if (typeof details === 'string') {
    return { description: details.substring(0, 1000) };
  }

  if (typeof details === 'object' && !Array.isArray(details)) {
    const sanitized = {};
    for (const [key, value] of Object.entries(details)) {
      if (!sensitiveKeys.some(sk => key.toLowerCase().includes(sk))) {
        sanitized[key] = typeof value === 'string' ? value.substring(0, 1000) : value;
      }
    }
    return Object.keys(sanitized).length > 0 ? sanitized : null;
  }

  return { data: String(details).substring(0, 1000) };
}

/**
 * Creates a standardized JSON error response object.
 * 
 * @param {number} statusCode - HTTP status code for the error (e.g., 400, 404, 500)
 * @param {string} message - Human-readable error message
 * @param {object|string|null} [details=null] - Optional additional error details
 * @param {string} [requestId] - Unique request identifier for tracing
 * @returns {Readonly<{status: number, message: string, details?: object, requestId?: string, timestamp: string}>} 
 * Standardized error response object
 * 
 * @throws {TypeError} If statusCode is not a valid HTTP status code
 * @throws {TypeError} If message is not a non-empty string
 * 
 * @example
 * // Returns: { status: 400, message: "Bad Request", details: { field: "email" }, timestamp: "2024-01-01T00:00:00.000Z" }
 * createErrorResponse(400, "Bad Request", { field: "email" });
 */
function createErrorResponse(statusCode, message, details = null, requestId) {
  // Input validation with specific error types
  if (!isValidStatusCode(statusCode)) {
    throw new TypeError(
      `Invalid status code: ${statusCode}. Must be an integer between 100 and 599.`
    );
  }

  if (!isValidMessage(message)) {
    throw new TypeError(
      `Invalid message: "${message}". Must be a non-empty string.`
    );
  }

  // Performance optimization: pre-allocate object with known properties
  const errorResponse = {
    status: statusCode,
    message: message.trim(),
    timestamp: new Date().toISOString()
  };

  // Add request ID for distributed tracing
  if (requestId) {
    errorResponse.requestId = requestId;
  }

  // Add sanitized details if provided
  const sanitizedDetails = sanitizeDetails(details);
  if (sanitizedDetails !== null) {
    errorResponse.details = sanitizedDetails;
  }

  // Freeze object to prevent mutation (performance optimization for frequent use)
  return Object.freeze(errorResponse);
}

/**
 * Express middleware to send a standardized JSON error response.
 * Includes automatic logging and request tracing.
 * 
 * @param {import('express').Response} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 * @param {object|string|null} [details=null] - Optional error details
 * @param {string} [errorCode] - Application-specific error code
 * @returns {import('express').Response} Express response with error JSON
 * 
 * @throws {Error} If response headers already sent
 */
function sendErrorResponse(res, statusCode, message, details = null, errorCode) {
  // Security check: prevent header already sent errors
  if (res.headersSent) {
    logger.error('Attempted to send error response after headers were sent', {
      statusCode,
      message,
      errorCode
    });
    return res;
  }

  try {
    const requestId = res.req?.id || uuidv4();
    const errorResponse = createErrorResponse(statusCode, message, details, requestId);

    // Add error code if provided
    if (errorCode) {
      errorResponse.errorCode = errorCode;
    }

    // Structured logging with appropriate level based on status code
    const logLevel = statusCode >= 500 ? 'error' : statusCode >= 400 ? 'warn' : 'info';
    logger[logLevel]('Error response sent', {
      statusCode,
      message,
      errorCode,
      requestId,
      path: res.req?.path,
      method: res.req?.method,
      ip: res.req?.ip
    });

    return res.status(statusCode).json(errorResponse);
  } catch (error) {
    // Fallback error handling for unexpected errors in the error handler itself
    logger.error('Error in sendErrorResponse', {
      error: error.message,
      stack: error.stack,
      originalStatus: statusCode,
      originalMessage: message
    });

    return res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
      timestamp: new Date().toISOString()
    });
  }
}

/**
 * Express error handling middleware for AppError instances.
 * 
 * @param {Error} err - Error object
 * @param {import('express').Request} req - Express request
 * @param {import('express').Response} res - Express response
 * @param {import('express').NextFunction} next - Express next function
 */
function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    return sendErrorResponse(
      res,
      err.statusCode,
      err.message,
      err.details,
      err.errorCode
    );
  }

  // Handle unknown errors
  logger.error('Unhandled error', {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });

  return sendErrorResponse(
    res,
    500,
    process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message,
    null,
    'INTERNAL_ERROR'
  );
}

module.exports = {
  AppError,
  createErrorResponse,
  sendErrorResponse,
  errorHandler
};