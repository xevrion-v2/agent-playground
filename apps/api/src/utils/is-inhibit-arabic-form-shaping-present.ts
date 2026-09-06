export function isInhibitArabicFormShapingPresent(input: string): boolean {
  return input.includes("\u{206C}");
}
