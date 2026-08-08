export type CreateUserInput = Record<string, unknown>;

export interface StubUser {
    id: string;
    [key: string]: unknown;
}

/**
 * Returns the placeholder user list used by the API until persistence is implemented.
 */
export function listUsers(): StubUser[] {
    return [];
}

/**
 * Builds a placeholder user record from the submitted request body.
 */
export function createUser(input: CreateUserInput): StubUser {
    return {
          id: "stub-user-id",
          ...input
    };
}
