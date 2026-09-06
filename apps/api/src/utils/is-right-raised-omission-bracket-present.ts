const RIGHT_RAISED_OMISSION_BRACKET = "\u2e0d";

export function isRightRaisedOmissionBracketPresent(input: string): boolean {
  return input.includes(RIGHT_RAISED_OMISSION_BRACKET);
}
