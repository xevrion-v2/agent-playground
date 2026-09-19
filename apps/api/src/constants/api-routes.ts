export const API_ROUTE_PREFIXES = {
  health: "/health",
  auth: "/auth",
  users: "/users",
  tasks: "/tasks",
  proposals: "/proposals",
  payments: "/payments",
  reviews: "/reviews",
  messages: "/messages",
  notifications: "/notifications",
  files: "/files",
  search: "/search",
  admin: "/admin"
} as const;

export type ApiRouteKey = keyof typeof API_ROUTE_PREFIXES;
export type ApiRoutePrefix = (typeof API_ROUTE_PREFIXES)[ApiRouteKey];

export function getApiRoutePrefix(route: ApiRouteKey): ApiRoutePrefix {
  return API_ROUTE_PREFIXES[route];
}
