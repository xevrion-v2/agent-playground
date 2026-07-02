export const taskStatuses = {
  draft: "draft",
  open: "open",
  assigned: "assigned",
  inProgress: "in_progress",
  review: "review",
  completed: "completed",
  cancelled: "cancelled",
} as const;

export type TaskStatus = (typeof taskStatuses)[keyof typeof taskStatuses];

export const taskStatusValues = Object.values(taskStatuses);
