export function parsePort(rawPort: string | undefined, defaultPort = 4000): number {
  if (rawPort === undefined) {
    return defaultPort;
  }

  const trimmedPort = rawPort.trim();
  const parsedPort = Number(trimmedPort);

  if (
    trimmedPort === "" ||
    !Number.isInteger(parsedPort) ||
    parsedPort < 0 ||
    parsedPort > 65535
  ) {
    throw new Error(
      `Invalid PORT value "${rawPort}". PORT must be an integer between 0 and 65535.`
    );
  }

  return parsedPort;
}

export function getPort(env: Pick<NodeJS.ProcessEnv, "PORT"> = process.env): number {
  return parsePort(env.PORT);
}
