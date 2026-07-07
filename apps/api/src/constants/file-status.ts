export const fileStatuses = {
  uploaded: "uploaded",
  processing: "processing",
  available: "available",
  failed: "failed",
  deleted: "deleted",
} as const;

export type FileStatus = (typeof fileStatuses)[keyof typeof fileStatuses];

export const fileStatusValues = Object.values(fileStatuses);
