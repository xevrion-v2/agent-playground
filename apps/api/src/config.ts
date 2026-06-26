const DEFAULT_PORT = 4000;
const MAX_PORT = 65535;

export function parsePort(rawPort: string | undefined): number {
  if (rawPort === undefined) {
    return DEFAULT_PORT;
  }

  const normalizedPort = rawPort.trim();

  if (!/^\d+$/.test(normalizedPort)) {
    throw new Error(
      `Invalid PORT "${rawPort}". PORT must be an integer from 0 to ${MAX_PORT}.`
    );
  }

  const port = Number(normalizedPort);

  if (!Number.isSafeInteger(port) || port < 0 || port > MAX_PORT) {
    throw new Error(
      `Invalid PORT "${rawPort}". PORT must be an integer from 0 to ${MAX_PORT}.`
    );
  }

  return port;
}
