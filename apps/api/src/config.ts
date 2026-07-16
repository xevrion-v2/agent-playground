/**
 * Parses and validates the server port from the environment.
 * @param env The environment object (usually process.env)
 * @returns The validated port number
 */
export function getPort(env: Record<string, string | undefined>): number {
  const rawPort = env.PORT;

  if (rawPort === undefined || rawPort === "") {
    return 4000;
  }

  const port = Number(rawPort);

  if (isNaN(port) || !Number.isInteger(port)) {
    throw new Error(`Invalid PORT: must be a number (received: ${rawPort})`);
  }

  if (port < 0 || port > 65535) {
    throw new Error(`Invalid PORT: out of range (0-65535) (received: ${port})`);
  }

  return port;
}
