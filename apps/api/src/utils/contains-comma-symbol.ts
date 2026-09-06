import { containsSymbol } from "./contains-symbol";

export function containsCommaSymbol(value: string): boolean {
  return containsSymbol(value, ",");
}
