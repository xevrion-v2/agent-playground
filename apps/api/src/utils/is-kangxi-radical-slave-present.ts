const KANGXI_RADICAL_SLAVE = "\u{2FAA}";

export function isKangxiRadicalSlavePresent(input: string): boolean {
  return input.includes(KANGXI_RADICAL_SLAVE);
}

export function $fn(input: string): boolean {
  return isKangxiRadicalSlavePresent(input);
}

export default isKangxiRadicalSlavePresent;
