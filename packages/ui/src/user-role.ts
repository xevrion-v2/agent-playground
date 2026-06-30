// ponytail: user role constants
export const USER_ROLE = { CLIENT: 'client', FREELANCER: 'freelancer', ADMIN: 'admin' } as const;
export type UserRole = typeof USER_ROLE[keyof typeof USER_ROLE];
