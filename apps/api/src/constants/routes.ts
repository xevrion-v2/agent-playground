/**
 * API route prefix constants for TaskFlow API.
 * Use these named constants instead of hardcoded route strings for consistency.
 */

// Root API prefix
export const API_PREFIX = "/api";

// Health check
export const HEALTH = "/health";

// Core resource routes
export const USERS = "/users";
export const TASKS = "/tasks";
export const TASK_BOARDS = "/task-boards";
export const PROPOSALS = "/proposals";
export const PAYMENTS = "/payments";
export const BILLING = "/billing";
export const REVIEWS = "/reviews";
export const MESSAGES = "/messages";
export const NOTIFICATIONS = "/notifications";
export const FILES = "/files";
export const SEARCH = "/search";
export const ADMIN = "/admin";

// Authentication routes
export const AUTH = "/auth";
export const AUTH_LOGIN = `${AUTH}/login`;
export const AUTH_LOGOUT = `${AUTH}/logout`;
export const AUTH_REGISTER = `${AUTH}/register`;
export const AUTH_REFRESH = `${AUTH}/refresh`;

// User sub-routes
export const USER_PROFILE = `${USERS}/profile`;
export const USER_SETTINGS = `${USERS}/settings`;

// Task sub-routes
export const TASK_DETAIL = `${TASKS}/:id`;
export const TASK_COMMENTS = `${TASKS}/:id/comments`;
export const TASK_ATTACHMENTS = `${TASKS}/:id/attachments`;

/**
 * Consolidated route constants object for convenient lookup.
 */
export const ApiRoutes = {
  API_PREFIX,
  HEALTH,
  USERS,
  TASKS,
  TASK_BOARDS,
  PROPOSALS,
  PAYMENTS,
  BILLING,
  REVIEWS,
  MESSAGES,
  NOTIFICATIONS,
  FILES,
  SEARCH,
  ADMIN,
  AUTH,
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_REGISTER,
  AUTH_REFRESH,
  USER_PROFILE,
  USER_SETTINGS,
  TASK_DETAIL,
  TASK_COMMENTS,
  TASK_ATTACHMENTS,
} as const;

export default ApiRoutes;
