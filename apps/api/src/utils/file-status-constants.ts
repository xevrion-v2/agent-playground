/**
 * File status constants for the API.
 * @module utils/file-status-constants
 */
export const FileStatus = {
  PENDING: "pending",
  UPLOADED: "uploaded",
  PROCESSING: "processing",
  COMPLETED: "completed",
  FAILED: "failed",
} as const;

export type FileStatusType = (typeof FileStatus)[keyof typeof FileStatus];
