export const notificationTypes = {
  taskAssigned: "task_assigned",
  proposalReceived: "proposal_received",
  messageReceived: "message_received",
  paymentUpdated: "payment_updated",
  reviewReceived: "review_received",
} as const;

export type NotificationType =
  (typeof notificationTypes)[keyof typeof notificationTypes];

export const notificationTypeValues = Object.values(notificationTypes);