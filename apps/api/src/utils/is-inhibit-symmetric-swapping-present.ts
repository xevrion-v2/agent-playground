const INHIBIT_SYMMETRIC_SWAPPING = "\u206a";

export function isInhibitSymmetricSwappingPresent(input: string): boolean {
  return input.includes(INHIBIT_SYMMETRIC_SWAPPING);
}
