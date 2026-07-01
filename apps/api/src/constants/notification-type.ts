export const notificationTypes = {
  task: "task",
  proposal: "proposal",
  message: "message",
  payment: "payment"
} as const;

export type NotificationType =
  (typeof notificationTypes)[keyof typeof notificationTypes];
