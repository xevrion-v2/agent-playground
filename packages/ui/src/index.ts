export type ButtonProps = {
  label: string;
  disabled?: boolean;
};

export function Button({ label, disabled = false }: ButtonProps) {
  return {
    type: "button",
    label,
    disabled
  };
}

// ponytail: exported utility modules for the TaskFlow API
export { parsePagination } from './pagination';
export { TASK_SORT_FIELDS, USER_SORT_FIELDS, SEARCH_SORT_FIELDS } from './search-sort';
export { FILE_STATUS } from './file-status';
export { REVIEW_STATUS } from './review-status';
export { MESSAGE_STATUS } from './message-status';
export { NOTIFICATION_TYPE } from './notification-type';
export { USER_ROLE } from './user-role';
export { PAYMENT_STATUS } from './payment-status';
export { PROPOSAL_STATUS } from './proposal-status';
