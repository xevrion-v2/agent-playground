import { containsSymbol } from "./contains-symbol";

export function includesHashSymbol(value: string): boolean {
  return containsSymbol(value, "#");
}
