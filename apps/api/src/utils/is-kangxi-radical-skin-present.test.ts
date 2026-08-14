import assert from "node:assert/strict"
import { isKangxiRadicalSkinPresent } from "./is-kangxi-radical-skin-present"

const cases = [
  { input: "\u{2F6A}", expected: true },
  { input: "hello", expected: false },
  { input: "\u{2F00}abc", expected: false },
  { input: "abc\u{2F6A}def", expected: true },
  { input: "", expected: false },
]

for (const { input, expected } of cases) {
  assert.equal(isKangxiRadicalSkinPresent(input), expected)
}

console.log("isKangxiRadicalSkinPresent smoke tests passed")
