/**
 * Asserts that a value is of type `never`, used for exhaustive
 * type-checking in switch statements and conditional branches.
 *
 * Throws at runtime if called with a non-never value, which
 * guards against unhandled enum variants or union members.
 */
export function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${JSON.stringify(value)}`);
}
