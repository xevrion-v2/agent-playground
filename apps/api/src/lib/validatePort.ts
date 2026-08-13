/**
 * Validates the PORT environment variable before app.listen().
 * Rejects non-numeric, out-of-range (1-65535), and privileged ports
 * (below 1024 unless explicitly allowed).
 */
export function validatePort(raw: string | undefined, fallback = 4000): number {
  const value = raw ?? String(fallback);
  const port = Number(value);

  if (!Number.isFinite(port) || !Number.isInteger(port)) {
    throw new Error();
  }
  if (port < 1 || port > 65535) {
    throw new Error();
  }

  return port;
}

export default validatePort;
