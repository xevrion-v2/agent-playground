export const fileStatuses = {
  uploading: "uploading",
  ready: "ready",
  failed: "failed",
  deleted: "deleted",
} as const;

export type FileStatus = (typeof fileStatuses)[keyof typeof fileStatuses];
