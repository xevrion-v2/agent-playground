export const apiRoutes = {
  health: "/health",
  users: "/users",
  tasks: "/tasks",
  proposals: "/proposals",
  payments: "/payments",
  reviews: "/reviews",
  messages: "/messages",
  notifications: "/notifications",
  files: "/files",
  search: "/search",
  admin: "/admin",
} as const;

export type ApiRouteName = keyof typeof apiRoutes;