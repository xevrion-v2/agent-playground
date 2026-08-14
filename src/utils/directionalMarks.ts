/**
 * Unicode Directional Mark Detection Utilities
 * Part of TaskFlow API - Bug Bounty Program
 * 
 * Detects Unicode bidirectional text control characters
 * for proper text rendering and processing.
 */

const RTL_MARK = '\u200F';
const LTR_MARK = '\u200E';
const RLO = '\u202E';
const LRO = '\u202D';
const PDF = '\u202C';

export function isRightToLeftMarkPresent(text: string): boolean {
  return text.includes(RTL_MARK);
}

export function isLeftToRightMarkPresent(text: string): boolean {
  return text.includes(LTR_MARK);
}

export function isRightToLeftOverridePresent(text: string): boolean {
  return text.includes(RLO);
}

export function isLeftToRightOverridePresent(text: string): boolean {
  return text.includes(LRO);
}

export function isPopDirectionalFormattingPresent(text: string): boolean {
  return text.includes(PDF);
}

export function getAllDirectionalMarks(text: string): string[] {
  const marks: string[] = [];
  if (text.includes(RTL_MARK)) marks.push('RTL-MARK');
  if (text.includes(LTR_MARK)) marks.push('LTR-MARK');
  if (text.includes(RLO)) marks.push('RLO');
  if (text.includes(LRO)) marks.push('LRO');
  if (text.includes(PDF)) marks.push('PDF');
  return marks;
}

export function stripDirectionalMarks(text: string): string {
  return text.replace(/[\u200E\u200F\u202D\u202E\u202C]/g, '');
}

export { RTL_MARK, LTR_MARK, RLO, LRO, PDF };
