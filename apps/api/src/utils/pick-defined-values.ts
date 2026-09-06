import { omitUndefined, type OmitUndefined } from "./omit-undefined";

export function pickDefinedValues<T extends Record<string, unknown>>(value: T): OmitUndefined<T> {
  return omitUndefined(value);
}
