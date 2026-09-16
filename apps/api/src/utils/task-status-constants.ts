/**
 * Task status constants.
 * @module utils/task-status-constants
 */
export const TaskStatus = {
  TODO: "todo",
  IN_PROGRESS: "in_progress",
  IN_REVIEW: "in_review",
  DONE: "done",
  CANCELLED: "cancelled",
} as const;

export type TaskStatusType = (typeof TaskStatus)[keyof typeof TaskStatus];
