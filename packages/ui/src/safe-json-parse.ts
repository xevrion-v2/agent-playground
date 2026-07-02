export function safeJsonParse(text: string): unknown | undefined {
  try { return JSON.parse(text); } catch { return undefined; }
}
