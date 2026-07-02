export const messageStatuses = {
  sent: "sent",
  delivered: "delivered",
  read: "read"
} as const;

export type MessageStatus =
  (typeof messageStatuses)[keyof typeof messageStatuses];
