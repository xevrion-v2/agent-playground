import type { Request } from "express";

export type UserPayload = Record<string, unknown>;

export interface StubUser {
  id: string;
  [key: string]: unknown;
}

/**
 * Returns the current user collection placeholder.
 *
 * The API does not persist users yet, so callers receive an empty list while
 * the route keeps a stable response shape for future storage work.
 */
export function listUsers(): StubUser[] {
  return [];
}

/**
 * Builds the current user creation placeholder response.
 *
 * The request body is echoed into a deterministic stub user so downstream
 * clients can develop against the POST /users contract before persistence is
 * implemented.
 */
export function createUser(payload: Request["body"]): StubUser {
  return {
    id: "stub-user-id",
    ...(payload as UserPayload)
  };
}
