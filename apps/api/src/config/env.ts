export function getEnv(name: string): string | undefined {
  const value = (
    globalThis as { process?: { env?: Record<string, string | undefined> } }
  ).process?.env?.[name];

  if (value === undefined || value.trim() === "") {
    return undefined;
  }

  return value;
}

export function requireEnv(name: string): string {
  const value = getEnv(name);

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}
