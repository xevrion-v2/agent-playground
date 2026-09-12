/**
 * Task status constants for TaskFlow API task lifecycle values.
 * Use these named constants instead of magic strings for consistency.
 */

// Core task statuses
export const DRAFT = "DRAFT";
export const OPEN = "OPEN";
export const PENDING = "PENDING";
export const IN_PROGRESS = "IN_PROGRESS";
export const IN_REVIEW = "IN_REVIEW";
export const COMPLETED = "COMPLETED";
export const CANCELLED = "CANCELLED";
export const CLOSED = "CLOSED";
export const ARCHIVED = "ARCHIVED";

// Extended task statuses
export const TODO = "TODO";
export const BACKLOG = "BACKLOG";
export const READY = "READY";
export const ASSIGNED = "ASSIGNED";
export const ACCEPTED = "ACCEPTED";
export const REJECTED = "REJECTED";
export const BLOCKED = "BLOCKED";
export const ON_HOLD = "ON_HOLD";
export const PAUSED = "PAUSED";
export const WAITING = "WAITING";
export const NEEDS_INFO = "NEEDS_INFO";
export const NEEDS_REVISION = "NEEDS_REVISION";
export const APPROVED = "APPROVED";
export const PUBLISHED = "PUBLISHED";
export const EXPIRED = "EXPIRED";
export const DELETED = "DELETED";

// Task priority levels
export const PRIORITY_LOW = "LOW";
export const PRIORITY_MEDIUM = "MEDIUM";
export const PRIORITY_HIGH = "HIGH";
export const PRIORITY_URGENT = "URGENT";
export const PRIORITY_CRITICAL = "CRITICAL";

/**
 * All valid task statuses in lifecycle order.
 */
export const TASK_STATUSES = [
  DRAFT,
  OPEN,
  PENDING,
  BACKLOG,
  TODO,
  READY,
  ASSIGNED,
  ACCEPTED,
  IN_PROGRESS,
  BLOCKED,
  ON_HOLD,
  PAUSED,
  WAITING,
  NEEDS_INFO,
  NEEDS_REVISION,
  IN_REVIEW,
  APPROVED,
  COMPLETED,
  PUBLISHED,
  CLOSED,
  ARCHIVED,
  CANCELLED,
  REJECTED,
  EXPIRED,
  DELETED,
] as const;

/**
 * Active task statuses (not terminal).
 */
export const ACTIVE_STATUSES = [
  OPEN,
  PENDING,
  BACKLOG,
  TODO,
  READY,
  ASSIGNED,
  ACCEPTED,
  IN_PROGRESS,
  BLOCKED,
  ON_HOLD,
  PAUSED,
  WAITING,
  NEEDS_INFO,
  NEEDS_REVISION,
  IN_REVIEW,
] as const;

/**
 * Terminal task statuses (final states).
 */
export const TERMINAL_STATUSES = [
  COMPLETED,
  CLOSED,
  ARCHIVED,
  CANCELLED,
  REJECTED,
  EXPIRED,
  DELETED,
] as const;

/**
 * Checks if a status is a valid task status.
 */
export const isValidTaskStatus = (status: string): boolean => {
  return (TASK_STATUSES as readonly string[]).includes(status);
};

/**
 * Checks if a status is an active (non-terminal) status.
 */
export const isActiveStatus = (status: string): boolean => {
  return (ACTIVE_STATUSES as readonly string[]).includes(status);
};

/**
 * Checks if a status is a terminal (final) status.
 */
export const isTerminalStatus = (status: string): boolean => {
  return (TERMINAL_STATUSES as readonly string[]).includes(status);
};

/**
 * Consolidated task status constants object for convenient lookup.
 */
export const TaskStatus = {
  // Core
  DRAFT,
  OPEN,
  PENDING,
  IN_PROGRESS,
  IN_REVIEW,
  COMPLETED,
  CANCELLED,
  CLOSED,
  ARCHIVED,
  // Extended
  TODO,
  BACKLOG,
  READY,
  ASSIGNED,
  ACCEPTED,
  REJECTED,
  BLOCKED,
  ON_HOLD,
  PAUSED,
  WAITING,
  NEEDS_INFO,
  NEEDS_REVISION,
  APPROVED,
  PUBLISHED,
  EXPIRED,
  DELETED,
  // Priorities
  PRIORITY_LOW,
  PRIORITY_MEDIUM,
  PRIORITY_HIGH,
  PRIORITY_URGENT,
  PRIORITY_CRITICAL,
  // Collections
  ALL: TASK_STATUSES,
  ACTIVE: ACTIVE_STATUSES,
  TERMINAL: TERMINAL_STATUSES,
  // Helpers
  isValid: isValidTaskStatus,
  isActive: isActiveStatus,
  isTerminal: isTerminalStatus,
} as const;

export default TaskStatus;
