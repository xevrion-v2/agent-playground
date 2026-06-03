/**
 * Health check endpoint with consistent response shape
 */
export function healthCheck(req: any, res: any) {
  res.json({
    status: 'ok',
    data: {
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
    },
  });
}
