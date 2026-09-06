export function apiError(res, status: number, message: string) {
  return res.status(status).json({ status: "error", data: null, message });
}
