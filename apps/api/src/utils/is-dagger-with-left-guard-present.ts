const DAGGER_WITH_LEFT_GUARD = "\u2e36";

export function isDaggerWithLeftGuardPresent(input: string): boolean {
  return input.includes(DAGGER_WITH_LEFT_GUARD);
}
