export const messageStatuses = {
  sent: "sent",
  delivered: "delivered",
  read: "read",
  archived: "archived",
} as const;

export type MessageStatus =
  (typeof messageStatuses)[keyof typeof messageStatuses];

export const messageStatusValues = Object.values(messageStatuses);