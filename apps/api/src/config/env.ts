export type EnvSource = Record<string, string | undefined>;

function normalizeEnvValue(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export function getOptionalEnv(
  name: string,
  fallback?: string,
  source: EnvSource = process.env,
): string | undefined {
  return normalizeEnvValue(source[name]) ?? fallback;
}

export function getRequiredEnv(
  name: string,
  source: EnvSource = process.env,
): string {
  const value = getOptionalEnv(name, undefined, source);

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function getApiPort(source: EnvSource = process.env): number {
  const rawPort = getOptionalEnv("PORT", "4000", source) ?? "4000";
  const port = Number.parseInt(rawPort, 10);

  if (!Number.isInteger(port) || port <= 0) {
    throw new Error(`PORT must be a positive integer, received: ${rawPort}`);
  }

  return port;
}
