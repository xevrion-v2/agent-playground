/**
 * Notification type constants.
 * @module utils/notification-type-constants
 */
export const NotificationType = {
  INFO: "info",
  WARNING: "warning",
  ERROR: "error",
  SUCCESS: "success",
} as const;

export type NotificationTypeEnum = (typeof NotificationType)[keyof typeof NotificationType];
