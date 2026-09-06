export function getEnv(key: string, required: boolean = false): string | undefined {
  const val = (globalThis as any).process?.env?.[key];
  if (required && !val) throw new Error(`Missing required env: ${key}`);
  return val;
}
