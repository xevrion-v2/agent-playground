const INHIBIT_ARABIC_FORM_SHAPING = "\u206c";

export function isInhibitArabicFormShapingPresent(input: string): boolean {
  return input.includes(INHIBIT_ARABIC_FORM_SHAPING);
}
