export type CorsConfig = {
  allowedOrigins: string[];
};

export function parseAllowedOrigins(value = ""): CorsConfig {
  return {
    allowedOrigins: value
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean),
  };
}