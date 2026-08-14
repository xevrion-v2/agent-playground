export const messageStatuses = {
  sent: "sent",
  delivered: "delivered",
  read: "read",
  failed: "failed",
} as const;

export type MessageStatus = (typeof messageStatuses)[keyof typeof messageStatuses];
