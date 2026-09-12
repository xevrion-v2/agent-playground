/**
 * Search sort constants for TaskFlow API task and user search endpoints.
 * Use these named constants instead of magic strings for consistency.
 */

// Sort directions
export const ASC = "asc";
export const DESC = "desc";
export const ASCENDING = "ascending";
export const DESCENDING = "descending";

// Task sort fields
export const TASK_SORT_ID = "id";
export const TASK_SORT_TITLE = "title";
export const TASK_SORT_STATUS = "status";
export const TASK_SORT_PRIORITY = "priority";
export const TASK_SORT_CREATED_AT = "createdAt";
export const TASK_SORT_UPDATED_AT = "updatedAt";
export const TASK_SORT_DUE_DATE = "dueDate";
export const TASK_SORT_COMPLETED_AT = "completedAt";
export const TASK_SORT_ASSIGNED_TO = "assignedTo";
export const TASK_SORT_CREATED_BY = "createdBy";
export const TASK_SORT_PROJECT_ID = "projectId";
export const TASK_SORT_CATEGORY = "category";
export const TASK_SORT_TAGS = "tags";
export const TASK_SORT_ESTIMATED_HOURS = "estimatedHours";
export const TASK_SORT_ACTUAL_HOURS = "actualHours";
export const TASK_SORT_BUDGET = "budget";
export const TASK_SORT_PROGRESS = "progress";
export const TASK_SORT_RELEVANCE = "relevance";
export const TASK_SORT_POPULARITY = "popularity";
export const TASK_SORT_VIEWS = "views";
export const TASK_SORT_LIKES = "likes";
export const TASK_SORT_COMMENTS = "comments";
export const TASK_SORT_LAST_ACTIVITY = "lastActivity";
export const TASK_SORT_DEADLINE = "deadline";
export const TASK_SORT_START_DATE = "startDate";
export const TASK_SORT_END_DATE = "endDate";

// User sort fields
export const USER_SORT_ID = "id";
export const USER_SORT_NAME = "name";
export const USER_SORT_USERNAME = "username";
export const USER_SORT_EMAIL = "email";
export const USER_SORT_ROLE = "role";
export const USER_SORT_STATUS = "status";
export const USER_SORT_CREATED_AT = "createdAt";
export const USER_SORT_UPDATED_AT = "updatedAt";
export const USER_SORT_LAST_LOGIN = "lastLogin";
export const USER_SORT_FIRST_NAME = "firstName";
export const USER_SORT_LAST_NAME = "lastName";
export const USER_SORT_FULL_NAME = "fullName";
export const USER_SORT_DISPLAY_NAME = "displayName";
export const USER_SORT_PHONE = "phone";
export const USER_SORT_ADDRESS = "address";
export const USER_SORT_CITY = "city";
export const USER_SORT_COUNTRY = "country";
export const USER_SORT_TIMEZONE = "timezone";
export const USER_SORT_LANGUAGE = "language";
export const USER_SORT_AVATAR = "avatar";
export const USER_SORT_BIO = "bio";
export const USER_SORT_WEBSITE = "website";
export const USER_SORT_COMPANY = "company";
export const USER_SORT_JOB_TITLE = "jobTitle";
export const USER_SORT_DEPARTMENT = "department";
export const USER_SORT_SKILLS = "skills";
export const USER_SORT_EXPERIENCE = "experience";
export const USER_SORT_HOURLY_RATE = "hourlyRate";
export const USER_SORT_RATING = "rating";
export const USER_SORT_REVIEWS = "reviews";
export const USER_SORT_COMPLETED_TASKS = "completedTasks";
export const USER_SORT_TOTAL_EARNINGS = "totalEarnings";
export const USER_SORT_TOTAL_SPENT = "totalSpent";
export const USER_SORT_FOLLOWERS = "followers";
export const USER_SORT_FOLLOWING = "following";
export const USER_SORT_RELEVANCE = "relevance";
export const USER_SORT_POPULARITY = "popularity";
export const USER_SORT_ACTIVITY = "activity";
export const USER_SORT_LAST_ACTIVITY = "lastActivity";
export const USER_SORT_VERIFIED = "verified";
export const USER_SORT_PREMIUM = "premium";
export const USER_SORT_MEMBER_SINCE = "memberSince";

// Proposal sort fields
export const PROPOSAL_SORT_ID = "id";
export const PROPOSAL_SORT_STATUS = "status";
export const PROPOSAL_SORT_AMOUNT = "amount";
export const PROPOSAL_SORT_CREATED_AT = "createdAt";
export const PROPOSAL_SORT_UPDATED_AT = "updatedAt";
export const PROPOSAL_SORT_SUBMITTED_AT = "submittedAt";
export const PROPOSAL_SORT_DEADLINE = "deadline";
export const PROPOSAL_SORT_DURATION = "duration";
export const PROPOSAL_SORT_FREELANCER_RATING = "freelancerRating";
export const PROPOSAL_SORT_RELEVANCE = "relevance";

// Payment sort fields
export const PAYMENT_SORT_ID = "id";
export const PAYMENT_SORT_STATUS = "status";
export const PAYMENT_SORT_AMOUNT = "amount";
export const PAYMENT_SORT_CURRENCY = "currency";
export const PAYMENT_SORT_METHOD = "method";
export const PAYMENT_SORT_CREATED_AT = "createdAt";
export const PAYMENT_SORT_UPDATED_AT = "updatedAt";
export const PAYMENT_SORT_COMPLETED_AT = "completedAt";
export const PAYMENT_SORT_PAYER = "payer";
export const PAYMENT_SORT_PAYEE = "payee";
export const PAYMENT_SORT_INVOICE_NUMBER = "invoiceNumber";

// Message sort fields
export const MESSAGE_SORT_ID = "id";
export const MESSAGE_SORT_CREATED_AT = "createdAt";
export const MESSAGE_SORT_UPDATED_AT = "updatedAt";
export const MESSAGE_SORT_SENDER = "sender";
export const MESSAGE_SORT_RECEIVER = "receiver";
export const MESSAGE_SORT_STATUS = "status";
export const MESSAGE_SORT_TYPE = "type";
export const MESSAGE_SORT_READ_AT = "readAt";
export const MESSAGE_SORT_LAST_MESSAGE = "lastMessage";
export const MESSAGE_SORT_UNREAD_COUNT = "unreadCount";

// File sort fields
export const FILE_SORT_ID = "id";
export const FILE_SORT_NAME = "name";
export const FILE_SORT_SIZE = "size";
export const FILE_SORT_TYPE = "type";
export const FILE_SORT_STATUS = "status";
export const FILE_SORT_CREATED_AT = "createdAt";
export const FILE_SORT_UPDATED_AT = "updatedAt";
export const FILE_SORT_UPLOADED_AT = "uploadedAt";
export const FILE_SORT_UPLOADER = "uploader";
export const FILE_SORT_DOWNLOADS = "downloads";
export const FILE_SORT_VIEWS = "views";

// Review sort fields
export const REVIEW_SORT_ID = "id";
export const REVIEW_SORT_RATING = "rating";
export const REVIEW_SORT_STATUS = "status";
export const REVIEW_SORT_CREATED_AT = "createdAt";
export const REVIEW_SORT_UPDATED_AT = "updatedAt";
export const REVIEW_SORT_REVIEWER = "reviewer";
export const REVIEW_SORT_REVIEwee = "reviewee";
export const REVIEW_SORT_HELPFUL = "helpful";
export const REVIEW_SORT_RELEVANCE = "relevance";

// Default sort values
export const DEFAULT_SORT_DIRECTION = DESC;
export const DEFAULT_TASK_SORT = TASK_SORT_CREATED_AT;
export const DEFAULT_USER_SORT = USER_SORT_CREATED_AT;
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;
export const MIN_PAGE_SIZE = 1;
export const DEFAULT_PAGE = 1;

/**
 * All valid sort directions.
 */
export const SORT_DIRECTIONS = [
  ASC,
  DESC,
  ASCENDING,
  DESCENDING,
] as const;

/**
 * All valid task sort fields.
 */
export const TASK_SORT_FIELDS = [
  TASK_SORT_ID,
  TASK_SORT_TITLE,
  TASK_SORT_STATUS,
  TASK_SORT_PRIORITY,
  TASK_SORT_CREATED_AT,
  TASK_SORT_UPDATED_AT,
  TASK_SORT_DUE_DATE,
  TASK_SORT_COMPLETED_AT,
  TASK_SORT_ASSIGNED_TO,
  TASK_SORT_CREATED_BY,
  TASK_SORT_PROJECT_ID,
  TASK_SORT_CATEGORY,
  TASK_SORT_TAGS,
  TASK_SORT_ESTIMATED_HOURS,
  TASK_SORT_ACTUAL_HOURS,
  TASK_SORT_BUDGET,
  TASK_SORT_PROGRESS,
  TASK_SORT_RELEVANCE,
  TASK_SORT_POPULARITY,
  TASK_SORT_VIEWS,
  TASK_SORT_LIKES,
  TASK_SORT_COMMENTS,
  TASK_SORT_LAST_ACTIVITY,
  TASK_SORT_DEADLINE,
  TASK_SORT_START_DATE,
  TASK_SORT_END_DATE,
] as const;

/**
 * All valid user sort fields.
 */
export const USER_SORT_FIELDS = [
  USER_SORT_ID,
  USER_SORT_NAME,
  USER_SORT_USERNAME,
  USER_SORT_EMAIL,
  USER_SORT_ROLE,
  USER_SORT_STATUS,
  USER_SORT_CREATED_AT,
  USER_SORT_UPDATED_AT,
  USER_SORT_LAST_LOGIN,
  USER_SORT_FIRST_NAME,
  USER_SORT_LAST_NAME,
  USER_SORT_FULL_NAME,
  USER_SORT_DISPLAY_NAME,
  USER_SORT_PHONE,
  USER_SORT_ADDRESS,
  USER_SORT_CITY,
  USER_SORT_COUNTRY,
  USER_SORT_TIMEZONE,
  USER_SORT_LANGUAGE,
  USER_SORT_AVATAR,
  USER_SORT_BIO,
  USER_SORT_WEBSITE,
  USER_SORT_COMPANY,
  USER_SORT_JOB_TITLE,
  USER_SORT_DEPARTMENT,
  USER_SORT_SKILLS,
  USER_SORT_EXPERIENCE,
  USER_SORT_HOURLY_RATE,
  USER_SORT_RATING,
  USER_SORT_REVIEWS,
  USER_SORT_COMPLETED_TASKS,
  USER_SORT_TOTAL_EARNINGS,
  USER_SORT_TOTAL_SPENT,
  USER_SORT_FOLLOWERS,
  USER_SORT_FOLLOWING,
  USER_SORT_RELEVANCE,
  USER_SORT_POPULARITY,
  USER_SORT_ACTIVITY,
  USER_SORT_LAST_ACTIVITY,
  USER_SORT_VERIFIED,
  USER_SORT_PREMIUM,
  USER_SORT_MEMBER_SINCE,
] as const;

/**
 * Checks if a direction is a valid sort direction.
 */
export const isValidSortDirection = (direction: string): boolean => {
  return (SORT_DIRECTIONS as readonly string[]).includes(direction);
};

/**
 * Checks if a field is a valid task sort field.
 */
export const isValidTaskSortField = (field: string): boolean => {
  return (TASK_SORT_FIELDS as readonly string[]).includes(field);
};

/**
 * Checks if a field is a valid user sort field.
 */
export const isValidUserSortField = (field: string): boolean => {
  return (USER_SORT_FIELDS as readonly string[]).includes(field);
};

/**
 * Normalizes a sort direction to asc or desc.
 */
export const normalizeSortDirection = (direction: string): string => {
  if (direction === ASCENDING || direction === ASC) return ASC;
  if (direction === DESCENDING || direction === DESC) return DESC;
  return DEFAULT_SORT_DIRECTION;
};

/**
 * Consolidated search sort constants object for convenient lookup.
 */
export const SearchSort = {
  // Directions
  ASC,
  DESC,
  ASCENDING,
  DESCENDING,
  // Task sort fields
  TASK_SORT_ID,
  TASK_SORT_TITLE,
  TASK_SORT_STATUS,
  TASK_SORT_PRIORITY,
  TASK_SORT_CREATED_AT,
  TASK_SORT_UPDATED_AT,
  TASK_SORT_DUE_DATE,
  TASK_SORT_COMPLETED_AT,
  TASK_SORT_ASSIGNED_TO,
  TASK_SORT_CREATED_BY,
  TASK_SORT_PROJECT_ID,
  TASK_SORT_CATEGORY,
  TASK_SORT_TAGS,
  TASK_SORT_ESTIMATED_HOURS,
  TASK_SORT_ACTUAL_HOURS,
  TASK_SORT_BUDGET,
  TASK_SORT_PROGRESS,
  TASK_SORT_RELEVANCE,
  TASK_SORT_POPULARITY,
  TASK_SORT_VIEWS,
  TASK_SORT_LIKES,
  TASK_SORT_COMMENTS,
  TASK_SORT_LAST_ACTIVITY,
  TASK_SORT_DEADLINE,
  TASK_SORT_START_DATE,
  TASK_SORT_END_DATE,
  // User sort fields
  USER_SORT_ID,
  USER_SORT_NAME,
  USER_SORT_USERNAME,
  USER_SORT_EMAIL,
  USER_SORT_ROLE,
  USER_SORT_STATUS,
  USER_SORT_CREATED_AT,
  USER_SORT_UPDATED_AT,
  USER_SORT_LAST_LOGIN,
  USER_SORT_FIRST_NAME,
  USER_SORT_LAST_NAME,
  USER_SORT_FULL_NAME,
  USER_SORT_DISPLAY_NAME,
  USER_SORT_PHONE,
  USER_SORT_ADDRESS,
  USER_SORT_CITY,
  USER_SORT_COUNTRY,
  USER_SORT_TIMEZONE,
  USER_SORT_LANGUAGE,
  USER_SORT_AVATAR,
  USER_SORT_BIO,
  USER_SORT_WEBSITE,
  USER_SORT_COMPANY,
  USER_SORT_JOB_TITLE,
  USER_SORT_DEPARTMENT,
  USER_SORT_SKILLS,
  USER_SORT_EXPERIENCE,
  USER_SORT_HOURLY_RATE,
  USER_SORT_RATING,
  USER_SORT_REVIEWS,
  USER_SORT_COMPLETED_TASKS,
  USER_SORT_TOTAL_EARNINGS,
  USER_SORT_TOTAL_SPENT,
  USER_SORT_FOLLOWERS,
  USER_SORT_FOLLOWING,
  USER_SORT_RELEVANCE,
  USER_SORT_POPULARITY,
  USER_SORT_ACTIVITY,
  USER_SORT_LAST_ACTIVITY,
  USER_SORT_VERIFIED,
  USER_SORT_PREMIUM,
  USER_SORT_MEMBER_SINCE,
  // Proposal sort fields
  PROPOSAL_SORT_ID,
  PROPOSAL_SORT_STATUS,
  PROPOSAL_SORT_AMOUNT,
  PROPOSAL_SORT_CREATED_AT,
  PROPOSAL_SORT_UPDATED_AT,
  PROPOSAL_SORT_SUBMITTED_AT,
  PROPOSAL_SORT_DEADLINE,
  PROPOSAL_SORT_DURATION,
  PROPOSAL_SORT_FREELANCER_RATING,
  PROPOSAL_SORT_RELEVANCE,
  // Payment sort fields
  PAYMENT_SORT_ID,
  PAYMENT_SORT_STATUS,
  PAYMENT_SORT_AMOUNT,
  PAYMENT_SORT_CURRENCY,
  PAYMENT_SORT_METHOD,
  PAYMENT_SORT_CREATED_AT,
  PAYMENT_SORT_UPDATED_AT,
  PAYMENT_SORT_COMPLETED_AT,
  PAYMENT_SORT_PAYER,
  PAYMENT_SORT_PAYEE,
  PAYMENT_SORT_INVOICE_NUMBER,
  // Message sort fields
  MESSAGE_SORT_ID,
  MESSAGE_SORT_CREATED_AT,
  MESSAGE_SORT_UPDATED_AT,
  MESSAGE_SORT_SENDER,
  MESSAGE_SORT_RECEIVER,
  MESSAGE_SORT_STATUS,
  MESSAGE_SORT_TYPE,
  MESSAGE_SORT_READ_AT,
  MESSAGE_SORT_LAST_MESSAGE,
  MESSAGE_SORT_UNREAD_COUNT,
  // File sort fields
  FILE_SORT_ID,
  FILE_SORT_NAME,
  FILE_SORT_SIZE,
  FILE_SORT_TYPE,
  FILE_SORT_STATUS,
  FILE_SORT_CREATED_AT,
  FILE_SORT_UPDATED_AT,
  FILE_SORT_UPLOADED_AT,
  FILE_SORT_UPLOADER,
  FILE_SORT_DOWNLOADS,
  FILE_SORT_VIEWS,
  // Review sort fields
  REVIEW_SORT_ID,
  REVIEW_SORT_RATING,
  REVIEW_SORT_STATUS,
  REVIEW_SORT_CREATED_AT,
  REVIEW_SORT_UPDATED_AT,
  REVIEW_SORT_REVIEWER,
  REVIEW_SORT_REVIEwee,
  REVIEW_SORT_HELPFUL,
  REVIEW_SORT_RELEVANCE,
  // Defaults
  DEFAULT_SORT_DIRECTION,
  DEFAULT_TASK_SORT,
  DEFAULT_USER_SORT,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  MIN_PAGE_SIZE,
  DEFAULT_PAGE,
  // Collections
  DIRECTIONS: SORT_DIRECTIONS,
  TASK_FIELDS: TASK_SORT_FIELDS,
  USER_FIELDS: USER_SORT_FIELDS,
  // Helpers
  isValidDirection: isValidSortDirection,
  isValidTaskField: isValidTaskSortField,
  isValidUserField: isValidUserSortField,
  normalizeDirection: normalizeSortDirection,
} as const;

export default SearchSort;
