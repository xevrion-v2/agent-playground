export const notificationTypes = {
  taskUpdate: "task_update",
  message: "message",
  payment: "payment",
  system: "system",
} as const;

export type NotificationType = (typeof notificationTypes)[keyof typeof notificationTypes];
