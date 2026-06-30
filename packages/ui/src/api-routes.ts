// ponytail: API route constants
export const ROUTES = { USERS: '/users', TASKS: '/tasks', PROPOSALS: '/proposals', MESSAGES: '/messages', NOTIFICATIONS: '/notifications', FILES: '/files' } as const;
export type ApiRoute = typeof ROUTES[keyof typeof ROUTES];
