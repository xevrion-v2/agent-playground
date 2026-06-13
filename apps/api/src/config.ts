/**
 * Validates and parses the PORT environment variable.
 * @returns The validated port number
 * @throws Error if PORT is invalid
 */
export function parsePort(): number {
  const portEnv = process.env.PORT;
  const defaultPort = 4000;

  if (!portEnv) {
    return defaultPort;
  }

  const port = parseInt(portEnv, 10);

  if (isNaN(port) || port < 0 || port > 65535) {
    throw new Error(`Invalid PORT value: "${portEnv}". Must be a number between 0 and 65535.`);
  }

  return port;
}
