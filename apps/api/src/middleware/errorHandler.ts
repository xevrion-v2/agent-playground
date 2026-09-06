import { Request, Response, NextFunction } from 'express'

export interface ApiError {
  status: number
  message: string
  details?: unknown
}

/**
 * Creates a structured API error response.
 *
 * Usage:
 *   throw apiError(400, 'Missing required field: email')
 *   throw apiError(404, 'User not found', { userId: 'abc' })
 *   throw apiError(500, 'Database connection failed')
 */
export function apiError(status: number, message: string, details?: unknown): ApiError {
  return { status, message, details }
}

/**
 * Express error-handling middleware.
 * Catches ApiError instances and unknown errors, returning consistent JSON responses.
 *
 * Must be registered AFTER all route handlers:
 *   app.use(errorHandler)
 */
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const apiErr = err as Partial<ApiError>

  if (apiErr.status && apiErr.message) {
    res.status(apiErr.status).json({
      error: {
        message: apiErr.message,
        ...(apiErr.details ? { details: apiErr.details } : {}),
      },
    })
    return
  }

  // Unknown error — log and return generic 500
  console.error('Unhandled error:', err)
  res.status(500).json({
    error: {
      message: 'Internal server error',
    },
  })
}

/**
 * Simple async route wrapper to forward rejections to error handler.
 *
 * Usage:
 *   router.get('/users', asyncHandler(async (req, res) => { ... }))
 */
export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next)
  }
}
