// ponytail: sort constants — no enum needed, string literals are sufficient
export const TASK_SORT_FIELDS = { CREATED_AT: 'createdAt', UPDATED_AT: 'updatedAt', TITLE: 'title', STATUS: 'status' } as const;
export const USER_SORT_FIELDS = { CREATED_AT: 'createdAt', NAME: 'name', EMAIL: 'email' } as const;
export const SEARCH_SORT_FIELDS = { RELEVANCE: 'relevance', CREATED_AT: 'createdAt', UPDATED_AT: 'updatedAt' } as const;
export type TaskSortField = typeof TASK_SORT_FIELDS[keyof typeof TASK_SORT_FIELDS];
export type UserSortField = typeof USER_SORT_FIELDS[keyof typeof USER_SORT_FIELDS];
export type SearchSortField = typeof SEARCH_SORT_FIELDS[keyof typeof SEARCH_SORT_FIELDS];
