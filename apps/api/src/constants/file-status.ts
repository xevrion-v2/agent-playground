export const fileStatuses = {
  uploaded: "uploaded",
  processing: "processing",
  ready: "ready",
  deleted: "deleted"
} as const;

export type FileStatus =
  (typeof fileStatuses)[keyof typeof fileStatuses];
