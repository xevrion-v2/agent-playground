// ponytail: task status constants for TaskFlow API
export const TASK_STATUS = { OPEN: 'open', IN_PROGRESS: 'inProgress', DONE: 'done', CANCELLED: 'cancelled' } as const;
export type TaskStatus = typeof TASK_STATUS[keyof typeof TASK_STATUS];
