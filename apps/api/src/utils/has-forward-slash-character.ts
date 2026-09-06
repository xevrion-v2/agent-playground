import { containsSymbol } from "./contains-symbol";

export function hasForwardSlashCharacter(value: string): boolean {
  return containsSymbol(value, "/");
}
