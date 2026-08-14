import assert from "node:assert/strict"
import { isKangxiRadicalDoNotPresent } from "./is-kangxi-radical-do-not-present"

const cases = [
  { input: "\u{2F4F}", expected: true },
  { input: "hello", expected: false },
  { input: "\u{2F00}abc", expected: false },
  { input: "abc\u{2F4F}def", expected: true },
  { input: "", expected: false },
]

for (const { input, expected } of cases) {
  assert.equal(isKangxiRadicalDoNotPresent(input), expected)
}

console.log("isKangxiRadicalDoNotPresent smoke tests passed")
