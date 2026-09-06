const TASK_STATUS = { TODO: 'todo', IN_PROGRESS: 'in_progress', IN_REVIEW: 'in_review', DONE: 'done', ARCHIVED: 'archived' } as const;
type TaskStatus = (typeof TASK_STATUS)[keyof typeof TASK_STATUS];
export { TASK_STATUS, TaskStatus };
