import { containsSymbol } from "./contains-symbol";

export function includesAmpersandSymbol(value: string): boolean {
  return containsSymbol(value, "&");
}
