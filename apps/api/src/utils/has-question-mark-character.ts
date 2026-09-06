import { containsSymbol } from "./contains-symbol";

export function hasQuestionMarkCharacter(value: string): boolean {
  return containsSymbol(value, "?");
}
