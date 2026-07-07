export function getEnv(name: string, fallback = "") {
  const value = process.env[name];

  return value && value.trim().length > 0 ? value : fallback;
}

export function requireEnv(name: string) {
  const value = getEnv(name);

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}