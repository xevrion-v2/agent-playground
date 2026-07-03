export const apiRoutes = {
  health: "/health",
  users: "/users",
  tasks: "/tasks",
  proposals: "/proposals",
  messages: "/messages",
  notifications: "/notifications",
  reviews: "/reviews",
  payments: "/payments",
  admin: "/admin"
} as const;

export type ApiRouteName = keyof typeof apiRoutes;
