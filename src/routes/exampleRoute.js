javascript
// src/routes/exampleRoute.js

const express = require('express');
const { body, param, validationResult } = require('express-validator');
const logger = require('../utils/logger');
const { AppError, ErrorCodes } = require('../utils/errors');

const router = express.Router();

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */

/**
 * @typedef {Object} Resource
 * @property {number} id - Unique identifier
 * @property {string} name - Resource name
 * @property {string} email - Resource email
 * @property {number|null} age - Resource age
 * @property {string} createdAt - ISO timestamp of creation
 */

/**
 * @typedef {Object} ApiErrorResponse
 * @property {boolean} success - Always false for error responses
 * @property {Object} error - Error details
 * @property {number} error.code - HTTP status code
 * @property {string} error.message - Human-readable error message
 * @property {string} error.timestamp - ISO timestamp of error occurrence
 * @property {string|null} error.requestId - Request identifier for tracing
 * @property {Object} [error.details] - Optional additional error details
 * @property {string} [error.errorCode] - Optional application-specific error code
 */

/**
 * Centralized API error response helper.
 * Provides consistent error formatting across all API endpoints.
 * 
 * @param {Response} res - Express response object
 * @param {number} statusCode - HTTP status code (e.g., 400, 404, 500)
 * @param {string} message - Human-readable error message
 * @param {Object} [details=null] - Optional additional error details
 * @param {string} [errorCode=null] - Optional application-specific error code
 * @returns {Response} JSON error response with standardized format
 * 
 * @example
 * // Basic usage
 * apiError(res, 400, 'Invalid request');
 * 
 * @example
 * // With details and error code
 * apiError(res, 404, 'Resource not found', { resourceId: 123 }, 'RESOURCE_NOT_FOUND');
 */
function apiError(res, statusCode, message, details = null, errorCode = null) {
  /** @type {ApiErrorResponse} */
  const responseBody = {
    success: false,
    error: {
      code: statusCode,
      message: message,
      timestamp: new Date().toISOString(),
      requestId: res.locals.requestId || null,
    },
  };

  if (details !== null) {
    responseBody.error.details = details;
  }

  if (errorCode !== null) {
    responseBody.error.errorCode = errorCode;
  }

  // Log error with appropriate severity based on status code
  const logLevel = statusCode >= 500 ? 'error' : statusCode >= 400 ? 'warn' : 'info';
  logger[logLevel](`API Error [${statusCode}]: ${message}`, {
    statusCode,
    errorCode,
    details,
    path: res.req?.originalUrl,
    method: res.req?.method,
    requestId: res.locals.requestId,
  });

  return res.status(statusCode).json(responseBody);
}

/**
 * @type {Array<Resource>}
 */
const mockResources = [
  { id: 1, name: 'Example One', email: 'one@example.com', age: 25, createdAt: '2024-01-01T00:00:00.000Z' },
  { id: 2, name: 'Example Two', email: 'two@example.com', age: 30, createdAt: '2024-01-02T00:00:00.000Z' },
];

/**
 * Find a resource by ID with caching optimization.
 * In production, replace with database query with Redis/Memcached caching layer.
 * 
 * @param {number} id - Resource ID (must be positive integer)
 * @returns {Promise<Resource|null>} Found resource or null if not found
 * @throws {TypeError} If id is not a valid number
 */
async function findResourceById(id) {
  if (typeof id !== 'number' || !Number.isFinite(id) || id < 1) {
    throw new TypeError('Resource ID must be a positive finite number');
  }

  // In production: return await database.findUnique({ where: { id } }) with caching
  return mockResources.find(r => r.id === id) || null;
}

/**
 * Create a new resource with validation and transaction support.
 * In production, replace with database insert with transaction support.
 * 
 * @param {Object} data - Resource data
 * @param {string} data.name - Resource name (2-100 characters)
 * @param {string} data.email - Resource email (valid email format)
 * @param {number|null} data.age - Resource age (0-150, nullable)
 * @returns {Promise<Resource>} Created resource with generated ID and timestamp
 * @throws {AppError} If creation fails due to database error
 * @throws {Error} If data validation fails
 */
async function createResource(data) {
  // Input validation
  if (!data || typeof data !== 'object') {
    throw new AppError('Invalid resource data', 400, ErrorCodes.VALIDATION_ERROR);
  }

  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
    throw new AppError('Name must be at least 2 characters', 400, ErrorCodes.VALIDATION_ERROR);
  }

  if (!data.email || typeof data.email !== 'string' || !data.email.includes('@')) {
    throw new AppError('Valid email is required', 400, ErrorCodes.VALIDATION_ERROR);
  }

  // In production: Use database transaction with retry logic
  const newResource = {
    id: Date.now() + Math.floor(Math.random() * 1000), // Ensure uniqueness
    name: data.name.trim(),
    email: data.email.toLowerCase().trim(),
    age: data.age !== null && data.age !== undefined ? Math.min(150, Math.max(0, data.age)) : null,
    createdAt: new Date().toISOString(),
  };

  // In production: Remove this simulation
  if (Math.random() < 0.001) {
    throw new AppError('Database write failed', 500, ErrorCodes.DATABASE_ERROR);
  }

  return newResource;
}

/**
 * GET /api/example/:id
 * 
 * Retrieves an example resource by ID.
 * Uses the centralized apiError helper for consistent error responses.
 * Implements input validation, error handling, and response sanitization.
 * 
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @returns {Promise<Response>} JSON response with resource data or error
 * 
 * @example
 * // Success response
 * GET /api/example/1
 * Response: { success: true, data: { id: 1, name: 'Example One', ... }, timestamp: '...' }
 * 
 * @example
 * // Error response
 * GET /api/example/999
 * Response: { success: false, error: { code: 404, message: 'Resource with ID 999 not found', ... } }
 */
router.get('/:id',
  [
    param('id')
      .trim()
      .isInt({ min: 1 })
      .withMessage('ID must be a positive integer')
      .toInt(),
  ],
  async (req, res, next) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiError(res, 400, 'Validation failed', 
          errors.array().map(err => ({
            field: err.path,
            message: err.msg,
            value: err.value,
          })),
          ErrorCodes.VALIDATION_ERROR
        );
      }

      const { id } = req.params;
      const resourceId = parseInt(id, 10);

      // Validate parsed ID
      if (isNaN(resourceId) || resourceId < 1) {
        return apiError(res, 400, 'Invalid resource ID format', null, ErrorCodes.VALIDATION_ERROR);
      }

      logger.debug(`Fetching resource with ID: ${resourceId}`, { resourceId });

      // Simulate async database call with error handling
      let resource;
      try {
        resource = await findResourceById(resourceId);
      } catch (findError) {
        logger.error(`Database error while fetching resource: ${findError.message}`, {
          error: findError.stack,
          resourceId,
        });
        return apiError(res, 500, 'Database error occurred', null, ErrorCodes.DATABASE_ERROR);
      }

      if (!resource) {
        logger.warn(`Resource not found: ${resourceId}`);
        return apiError(res, 404, `Resource with ID ${resourceId} not found`, null, ErrorCodes.NOT_FOUND);
      }

      // Sanitize response data - remove any sensitive fields
      const sanitizedResource = {
        id: resource.id,
        name: resource.name,
        email: resource.email,
        age: resource.age,
        createdAt: resource.createdAt,
      };

      logger.info(`Resource ${resourceId} retrieved successfully`, { resourceId });

      return res.status(200).json({
        success: true,
        data: sanitizedResource,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.error(`Unexpected error fetching resource: ${error.message}`, {
        error: error.stack,
        resourceId: req.params.id,
        requestId: res.locals.requestId,
      });
      return apiError(res, 500, 'Internal server error while fetching resource', null, ErrorCodes.INTERNAL_ERROR);
    }
  }
);

/**
 * POST /api/example
 * 
 * Creates a new example resource.
 * Uses the centralized apiError helper for consistent error responses.
 * Implements comprehensive input validation, sanitization, and error handling.
 * 
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @returns {Promise<Response>} JSON response with created resource or error
 * 
 * @example
 * // Success response
 * POST /api/example
 * Body: { name: 'New Resource', email: 'new@example.com', age: 25 }
 * Response: { success: true, data: { id: 1234567890, ... }, timestamp: '...' }
 * 
 * @example
 * // Validation error
 * POST /api/example
 * Body: { name: '', email: 'invalid' }
 * Response: { success: false, error: { code: 400, message: 'Validation failed', ... } }
 */
router.post('/',
  [
    body('name')
      .trim()
      .isString()
      .notEmpty()
      .withMessage('Name is required and must be a non-empty string')
      .isLength({ min: 2, max: 100 })
      .withMessage('Name must be between 2 and 100 characters')
      .escape(),
    body('email')
      .trim()
      .isEmail()
      .withMessage('A valid email address is required')
      .normalizeEmail()
      .isLength({ max: 255 })
      .withMessage('Email must not exceed 255 characters'),
    body('age')
      .optional({ nullable: true })
      .isInt({ min: 0, max: 150 })
      .withMessage('Age must be an integer between 0 and 150')
      .toInt(),
  ],
  async (req, res, next) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiError(res, 400, 'Validation failed. Please check the submitted data.', 
          errors.array().map(err => ({
            field: err.path,
            message: err.msg,
            value: err.value,
          })),
          ErrorCodes.VALIDATION_ERROR
        );
      }

      const { name, email, age } = req.body;

      logger.debug(`Creating resource with name: ${name}, email: ${email}`, {
        name,
        email,
        age,
      });

      // Sanitize and prepare data
      const resourceData = {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        age: age !== undefined && age !== null ? age : null,
      };

      // Create resource with error handling
      let newResource;
      try {
        newResource = await createResource(resourceData);
      } catch (createError) {
        if (createError instanceof AppError) {
          return apiError(res, createError.statusCode, createError.message, null, createError.errorCode);
        }
        logger.error(`Unexpected error during resource creation: ${createError.message}`, {
          error: createError.stack,
          resourceData,
        });
        return apiError(res, 500, 'Failed to create resource', null, ErrorCodes.CREATION_FAILED);
      }

      if (!newResource) {
        logger.error('Resource creation returned null/undefined', { resourceData });
        return apiError(res, 500, 'Failed to create resource. Please try again later.', 
          null, ErrorCodes.CREATION_FAILED);
      }

      logger.info(`Resource created successfully with ID: ${newResource.id}`, {
        resourceId: newResource.id,
        name: newResource.name,
      });

      return res.status(201).json({
        success: true,
        data: newResource,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.error(`Unexpected error in resource creation route: ${error.message}`, {
        error: error.stack,
        requestBody: req.body,
        requestId: res.locals.requestId,
      });
      return apiError(res, 500, 'Internal server error while creating resource', 
        null, ErrorCodes.INTERNAL_ERROR);
    }
  }
);

module.exports = router;