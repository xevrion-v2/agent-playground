/** Express middleware that rejects requests with bodies exceeding maxBytes. */
export function bodySizeLimit(maxBytes: number = 1024 * 10) {
  return (req: any, _res: any, next: any) => {
    const len = req.headers['content-length'] ? parseInt(req.headers['content-length'], 10) : 0;
    if (len > maxBytes) {
      const err: any = new Error('Request body too large');
      err.statusCode = 413;
      next(err);
      return;
    }
    next();
  };
}
