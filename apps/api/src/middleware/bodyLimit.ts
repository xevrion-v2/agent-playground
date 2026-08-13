import { Request, Response, NextFunction } from 'express';

const DEFAULT_MAX_BODY_SIZE = '100kb';

function parseSize(size: string): number {
  const match = size.match(/^(\d+)(kb|mb|b)?$/i);
  if (!match) return 102400;
  const num = parseInt(match[1], 10);
  const unit = (match[2] || 'kb').toLowerCase();
  if (unit === 'mb') return num * 1024 * 1024;
  if (unit === 'kb') return num * 1024;
  return num;
}

export function bodyLimit(maxSize: string = DEFAULT_MAX_BODY_SIZE) {
  return (req: Request, res: Response, next: NextFunction) => {
    const contentLength = parseInt(req.headers['content-length'] || '0', 10);
    const maxBytes = parseSize(maxSize);
    if (contentLength > maxBytes) {
      return res.status(413).json({ error: 'Request body too large', message: 'Maximum body size is ' + maxSize });
    }
    next();
  };
}
