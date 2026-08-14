import { $fn, isKangxiRadicalSunPresent } from "./is-kangxi-radical-sun-present";

function assertEqual(actual: boolean, expected: boolean, label: string): void {
  if (actual !== expected) {
    throw new Error(`${label}: expected ${expected}, received ${actual}`);
  }
}

assertEqual($fn("calendar \u2F47 marker"), true, "detects kangxi radical sun");
assertEqual($fn("\u65E5"), false, "does not match regular CJK sun ideograph");
assertEqual($fn("plain sunshine"), false, "does not match plain text");
assertEqual(isKangxiRadicalSunPresent("alias keeps the API readable \u2F47"), true, "alias detects kangxi radical sun");

console.log("API utility smoke tests passed");
