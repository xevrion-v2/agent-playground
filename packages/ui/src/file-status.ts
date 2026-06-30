// ponytail: file status constants
export const FILE_STATUS = { UPLOADING: 'uploading', PROCESSING: 'processing', READY: 'ready', DELETED: 'deleted', FAILED: 'failed' } as const;
export type FileStatus = typeof FILE_STATUS[keyof typeof FILE_STATUS];
