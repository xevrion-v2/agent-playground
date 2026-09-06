const normalizeSegment = (segment: string) => segment.replace(/^\/+|\/+$/g, "");

export const buildApiRoute = (...segments: string[]) => {
  const cleaned = segments.map(normalizeSegment).filter(Boolean);
  return cleaned.length ? `/${cleaned.join("/")}` : "/";
};

export const API_ROUTE_PREFIXES = {
  root: "/",
  api: buildApiRoute("api"),
  apiV1: buildApiRoute("api", "v1"),
  apiV2: buildApiRoute("api", "v2")
} as const;

export const API_ROUTES = {
  health: buildApiRoute("health"),
  users: buildApiRoute("users"),
  tasks: buildApiRoute("tasks"),
  projects: buildApiRoute("projects"),
  auth: buildApiRoute("auth")
} as const;
