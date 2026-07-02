/**
 * Task lifecycle status constants for API routes and middleware.
 *
 * @example
 * `	s
 * import { TaskStatus } from './task-status';
 * if (task.status === TaskStatus.COMPLETED) { /* ... *\/ }
 * `
 */
export const TaskStatus = {
  PENDING: 'pending' as const,
  IN_PROGRESS: 'in_progress' as const,
  COMPLETED: 'completed' as const,
  FAILED: 'failed' as const,
  CANCELLED: 'cancelled' as const,
} as const;

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];
