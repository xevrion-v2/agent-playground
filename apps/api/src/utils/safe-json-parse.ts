const safeJsonParse = <T>(json: string): T | null => { try { return JSON.parse(json) as T; } catch { return null; } };

export { safeJsonParse };
