/**
 * File upload/download status constants.
 *
 * @example
 * `	s
 * import { FileStatus } from './file-status';
 * if (file.status === FileStatus.UPLOADED) { /* ... *\/ }
 * `
 */
export const FileStatus = {
  UPLOADING: 'uploading' as const,
  UPLOADED: 'uploaded' as const,
  PROCESSING: 'processing' as const,
  READY: 'ready' as const,
  FAILED: 'failed' as const,
  DELETED: 'deleted' as const,
} as const;

export type FileStatus = (typeof FileStatus)[keyof typeof FileStatus];
