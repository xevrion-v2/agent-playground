typescript
// src/app.ts
// Purpose: Configure Express JSON body parser with a conservative size limit

import express, { Request, Response, NextFunction } from 'express';
import { createLogger, format, transports, Logger } from 'winston';
import { RateLimiterMemory, RateLimiterRes } from 'rate-limiter-flexible';
import { v4 as uuidv4 } from 'uuid';
import { randomBytes } from 'crypto';

// ============================================================================
// Constants and Configuration
// ============================================================================

/**
 * JSON body size limit configuration.
 * 
 * Expected value: 100kb (102400 bytes)
 * 
 * Rationale: This conservative limit prevents denial-of-service attacks through
 * excessively large JSON payloads while accommodating legitimate API requests.
 * The limit is enforced at the Express JSON parser level before any route
 * handlers execute, providing early rejection of oversized payloads.
 * 
 * Security considerations:
 * - Prevents memory exhaustion attacks
 * - Mitigates slow loris attacks on JSON parsing
 * - Protects against compression-based attacks (e.g., zip bombs)
 * - Limits attack surface for JSON injection
 * 
 * Performance impact:
 * - Reduces memory usage for large payloads
 * - Faster parsing for typical requests
 * - Prevents CPU exhaustion from complex JSON structures
 * 
 * If specific endpoints require larger payloads, they can be configured
 * individually using express.raw() or express.text() with appropriate limits.
 */
const JSON_BODY_LIMIT: string = '100kb';
const JSON_BODY_LIMIT_BYTES: number = 102400; // 100 * 1024

const PORT: number = parseInt(process.env.PORT || '3000', 10);
const RATE_LIMIT_POINTS: number = 100;
const RATE_LIMIT_DURATION: number = 60; // 1 minute
const MAX_JSON_DEPTH: number = 10;
const MAX_STRING_LENGTH: number = 10000;
const MAX_ARRAY_LENGTH: number = 1000;
const MAX_OBJECT_KEYS: number = 100;

// ============================================================================
// Logger Configuration
// ============================================================================

const logger: Logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    format.errors({ stack: true }),
    format.json()
  ),
  defaultMeta: { 
    service: 'express-app',
    environment: process.env.NODE_ENV || 'development'
  },
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      ),
      handleExceptions: true,
      handleRejections: true
    }),
    new transports.File({ 
      filename: 'error.log', 
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      handleExceptions: true,
      handleRejections: true
    }),
    new transports.File({ 
      filename: 'combined.log',
      maxsize: 5242880,
      maxFiles: 5,
      handleExceptions: true,
      handleRejections: true
    })
  ],
  exitOnError: false
});

// ============================================================================
// Custom Error Classes
// ============================================================================

/**
 * Base application error class with HTTP status code and error code.
 */
class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number, code: string, isOperational: boolean = true) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error thrown when JSON payload exceeds the configured size limit.
 */
class PayloadTooLargeError extends AppError {
  public readonly actualSize: number;
  public readonly maxSize: number;

  constructor(actualSize: number, maxSize: number) {
    super(
      `Request body exceeds maximum allowed size of ${maxSize} bytes (received ${actualSize} bytes)`,
      413,
      'PAYLOAD_TOO_LARGE'
    );
    this.actualSize = actualSize;
    this.maxSize = maxSize;
  }
}

/**
 * Error thrown when request body validation fails.
 */
class ValidationError extends AppError {
  public readonly details?: Record<string, unknown>;

  constructor(message: string, details?: Record<string, unknown>) {
    super(message, 400, 'VALIDATION_ERROR');
    this.details = details;
  }
}

/**
 * Error thrown when rate limit is exceeded.
 */
class RateLimitError extends AppError {
  public readonly retryAfter: number;

  constructor(retryAfter: number) {
    super('Too many requests, please try again later', 429, 'RATE_LIMIT_EXCEEDED');
    this.retryAfter = retryAfter;
  }
}

/**
 * Error thrown when an internal server error occurs.
 */
class InternalServerError extends AppError {
  constructor(message: string = 'An unexpected error occurred') {
    super(message, 500, 'INTERNAL_SERVER_ERROR', false);
  }
}

// ============================================================================
// Type Definitions and Interfaces
// ============================================================================

/**
 * Generic request body type.
 */
interface RequestBody {
  [key: string]: unknown;
}

/**
 * Standardized API response structure.
 */
interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  metadata: {
    timestamp: string;
    requestId: string;
    version: string;
  };
}

/**
 * Extended Express Request with custom properties.
 */
interface AuthenticatedRequest extends Request {
  requestId: string;
  startTime: number;
}

/**
 * Validation options for request body.
 */
interface ValidationOptions {
  maxDepth: number;
  maxStringLength: number;
  maxArrayLength: number;
  maxObjectKeys: number;
}

/**
 * Health check response.
 */
interface HealthCheckResponse {
  status: 'healthy' | 'unhealthy';
  uptime: number;
  memoryUsage: {
    heapUsed: number;
    heapTotal: number;
    rss: number;
  };
  version: string;
}

// ============================================================================
// Rate Limiter Configuration
// ============================================================================

const rateLimiter: RateLimiterMemory = new RateLimiterMemory({
  points: RATE_LIMIT_POINTS,
  duration: RATE_LIMIT_DURATION,
  blockDuration: RATE_LIMIT_DURATION * 2 // Block for 2 minutes after exceeding limit
});

// ============================================================================
// Express Application Setup
// ============================================================================

const app = express();

// ============================================================================
// Middleware: JSON Body Parser with Size Limit
// ============================================================================

/**
 * Configure Express JSON body parser with conservative size limit.
 * 
 * This middleware parses incoming JSON payloads and rejects those exceeding
 * the configured limit. The limit is enforced before any route handlers
 * execute, providing early rejection of oversized payloads.
 * 
 * @see JSON_BODY_LIMIT for the configured limit value
 */
app.use(express.json({ 
  limit: JSON_BODY_LIMIT,
  strict: true, // Only accept objects and arrays at the top level
  reviver: null, // No custom reviver for security
  type: ['application/json', 'application/*+json'] // Accept standard JSON content types
}));

// ============================================================================
// Middleware: Request ID and Timing
// ============================================================================

/**
 * Attach unique request ID and start time to each request.
 * Also validates content-length header against configured limit.
 */
app.use((req: Request, res: Response, next: NextFunction): void => {
  const authenticatedReq = req as AuthenticatedRequest;
  
  // Generate unique request ID
  authenticatedReq.requestId = uuidv4();
  authenticatedReq.startTime = Date.now();
  
  // Validate content-length header if present
  const contentLength: string | undefined = req.headers['content-length'];
  if (contentLength) {
    const length: number = parseInt(contentLength, 10);
    if (!isNaN(length) && length > JSON_BODY_LIMIT_BYTES) {
      const error: PayloadTooLargeError = new PayloadTooLargeError(length, JSON_BODY_LIMIT_BYTES);
      logger.warn('Request rejected due to content-length exceeding limit', {
        requestId: authenticatedReq.requestId,
        contentLength: length,
        maxSize: JSON_BODY_LIMIT_BYTES
      });
      
      res.status(error.statusCode).json({
        success: false,
        error: {
          code: error.code,
          message: error.message,
          details: {
            actualSize: error.actualSize,
            maxSize: error.maxSize
          }
        },
        metadata: {
          timestamp: new Date().toISOString(),
          requestId: authenticatedReq.requestId,
          version: '1.0.0'
        }
      } as ApiResponse);
      return;
    }
  }
  
  next();
});

// ============================================================================
// Middleware: Request Logging
// ============================================================================

/**
 * Log incoming requests and track response completion.
 */
app.use((req: Request, res: Response, next: NextFunction): void => {
  const authenticatedReq = req as AuthenticatedRequest;
  
  // Log incoming request
  logger.info('Incoming request', {
    requestId: authenticatedReq.requestId,
    method: req.method,
    path: req.path,
    query: req.query,
    ip: req.ip,
    userAgent: req.get('user-agent'),
    contentType: req.get('content-type'),
    contentLength: req.get('content-length'),
    origin: req.get('origin'),
    referer: req.get('referer')
  });
  
  // Log response on finish
  res.on('finish', () => {
    const duration: number = Date.now() - authenticatedReq.startTime;
    const logLevel: string = res.statusCode >= 500 ? 'error' : 
                             res.statusCode >= 400 ? 'warn' : 'info';
    
    logger.log(logLevel, 'Request completed', {
      requestId: authenticatedReq.requestId,
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      contentLength: res.get('content-length'),
      responseTime: duration
    });
  });
  
  // Log on error
  res.on('close', () => {
    if (!res.writableFinished) {
      const duration: number = Date.now() - authenticatedReq.startTime;
      logger.error('Request aborted', {
        requestId: authenticatedReq.requestId,
        method: req.method,
        path: req.path,
        duration: `${duration}ms`
      });
    }
  });
  
  next();
});

// ============================================================================
// Middleware: Rate Limiting
// ============================================================================

/**
 * Rate limiting middleware using in-memory store.
 * Limits requests per IP address within a time window.
 */
app.use(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authenticatedReq = req as AuthenticatedRequest;
  
  try {
    const ip: string = req.ip || req.socket.remoteAddress || 'unknown';
    const rateLimiterRes: RateLimiterRes = await rateLimiter.consume(ip);
    
    // Set rate limit headers
    res.setHeader('X-RateLimit-Limit', RATE_LIMIT_POINTS);
    res.setHeader('X-RateLimit-Remaining', rateLimiterRes.remainingPoints);
    res.setHeader('X-RateLimit-Reset', new Date(Date.now() + rateLimiterRes.msBeforeNext).toISOString());
    
    next();
  } catch (error) {
    if (error instanceof Error && 'msBeforeNext' in error) {
      const rateLimitError: RateLimitError = new RateLimitError(
        Math.ceil((error as any).msBeforeNext / 1000)
      );
      
      logger.warn('Rate limit exceeded', {
        requestId: authenticatedReq.requestId,
        ip: req.ip,
        path: req.path,
        method: req.method,
        retryAfter: rateLimitError.retryAfter
      });
      
      res.setHeader('Retry-After', rateLimitError.retryAfter);
      res.status(rateLimitError.statusCode).json({
        success: false,
        error: {
          code: rateLimitError.code,
          message: rateLimitError.message,
          details: {
            retryAfter: rateLimitError.retryAfter
          }
        },
        metadata: {
          timestamp: new Date().toISOString(),
          requestId: authenticatedReq.requestId,
          version: '1.0.0'
        }
      } as ApiResponse);
    } else {
      next(error);
    }
  }
});

// ============================================================================
// Middleware: Input Validation
// ============================================================================

/**
 * Validate request body structure and content.
 * Checks for:
 * - Empty body
 * - JSON depth
 * - String length
 * - Array length
 * - Object key count
 * - Suspicious patterns (prototype pollution, etc.)
 */
const validateRequestBody = (options: ValidationOptions = {
  maxDepth: MAX_JSON_DEPTH,
  maxStringLength: MAX_STRING_LENGTH,
  maxArrayLength: MAX_ARRAY_LENGTH,
  maxObjectKeys: MAX_OBJECT_KEYS
}) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authenticatedReq = req as AuthenticatedRequest;
    
    try {
      const body: RequestBody = req.body as RequestBody;
      
      // Check if body exists
      if (!body || Object.keys(body).length === 0) {
        throw new ValidationError('Request body is required');
      }
      
      // Validate JSON structure depth
      const checkDepth = (obj: unknown, depth: number = 0): number => {
        if (depth > options.maxDepth) {
          throw new ValidationError('JSON object depth exceeds maximum allowed', {
            maxDepth: options.maxDepth,
            currentDepth: depth
          });
        }
        
        if (typeof obj === 'object' && obj !== null) {
          if (Array.isArray(obj)) {
            if (obj.length > options.maxArrayLength) {
              throw new ValidationError('Array length exceeds maximum allowed', {
                maxLength: options.maxArrayLength,
                actualLength: obj.length
              });
            }
            return Math.max(...obj.map((v: unknown) => checkDepth(v, depth + 1)), depth);
          } else {
            const keys: string[] = Object.keys(obj as Record<string, unknown>);
            if (keys.length > options.maxObjectKeys) {
              throw new ValidationError('Object key count exceeds maximum allowed', {
                maxKeys: options.maxObjectKeys,
                actualKeys: keys.length
              });
            }
            
            // Check for prototype pollution attempts
            if (keys.some((key: string) => key === '__proto__' || key === 'constructor' || key === 'prototype')) {
              throw new ValidationError('Suspicious object keys detected');
            }
            
            return Math.max(...Object.values(obj as Record<string, unknown>).map(
              (v: unknown) => checkDepth(v, depth + 1)
            ), depth);
          }
        }
        
        return depth;
      };
      
      checkDepth(body);
      
      // Validate string lengths recursively
      const checkStringLengths = (obj: unknown): void => {
        if (typeof obj === 'string') {
          if (obj.length > options.maxStringLength) {
            throw new ValidationError('String value exceeds maximum allowed length', {
              maxLength: options.maxStringLength,
              actualLength: obj.length
            });
          }
          
          // Check for potential injection patterns
          const suspiciousPatterns: RegExp[] = [
            /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
            /javascript:/gi,
            /on\w+=/gi,
            /data:\s*text\/html/gi
          ];
          
          for (const pattern of suspiciousPatterns) {
            if (pattern.test(obj)) {
              throw new ValidationError('Suspicious content detected in string value');
            }
          }
        } else if (typeof obj === 'object' && obj !== null) {
          Object.values(obj as Record<string, unknown>).forEach(checkStringLengths);
        }
      };
      
      checkStringLengths(body);
      
      // Validate body size after parsing
      const bodyString: string = JSON.stringify(body);
      const bodySize: number = Buffer.byteLength(bodyString, 'utf8');
      
      if (bodySize > JSON_BODY_LIMIT_BYTES) {
        throw new PayloadTooLargeError(bodySize, JSON_BODY_LIMIT_BYTES);
      }
      
      next();
    } catch (error) {
      if (error instanceof AppError) {
        const logLevel: string = error.statusCode >= 500 ? 'error' : 'warn';
        logger.log(logLevel, 'Validation failed', {
          requestId: authenticatedReq.requestId,
          error: error.message,
          code: error.code,
          details: error instanceof ValidationError ? error.details : undefined
        });
        
        res.status(error.statusCode).json({
          success: false,
          error: {
            code: error.code,
            message: error.message,
            details: error instanceof ValidationError ? error.details : undefined
          },
          metadata: {
            timestamp: new Date().toISOString(),
            requestId: authenticatedReq.requestId,
            version: '1.0.0'
          }
        } as ApiResponse);
      } else {
        next(error);
      }
    }
  };
};

// ============================================================================
// Routes
// ============================================================================

/**
 * Health check endpoint.
 * Returns the current health status of the application.
 */
app.get('/health', (_req: Request, res: Response): void => {
  const healthCheck: HealthCheckResponse = {
    status: 'healthy',
    uptime: process.uptime(),
    memoryUsage: {
      heapUsed: Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100,
      heapTotal: Math.round(process.memoryUsage().heapTotal / 1024 / 1024 * 100) / 100,
      rss: Math.round(process.memoryUsage().rss / 1024 / 1024 * 100) / 100
    },
    version: '1.0.0'
  };
  
  res.json({
    success: