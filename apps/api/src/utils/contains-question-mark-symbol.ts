import { containsSymbol } from "./contains-symbol";

export function containsQuestionMarkSymbol(value: string): boolean {
  return containsSymbol(value, "?");
}
