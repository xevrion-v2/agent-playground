const KANGXI_RADICAL_BEAN = "\u{2F96}";

export function isKangxiRadicalBeanPresent(input: string): boolean {
  return input.includes(KANGXI_RADICAL_BEAN);
}

export function $fn(input: string): boolean {
  return isKangxiRadicalBeanPresent(input);
}

export default isKangxiRadicalBeanPresent;
