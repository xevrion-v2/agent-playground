const ACTIVATE_ARABIC_FORM_SHAPING = "\u206d";

export function isActivateArabicFormShapingPresent(input: string): boolean {
  return input.includes(ACTIVATE_ARABIC_FORM_SHAPING);
}
