export const userRoles = {
  client: "client",
  freelancer: "freelancer",
  admin: "admin"
} as const;

export type UserRole = (typeof userRoles)[keyof typeof userRoles];
