import assert from "node:assert/strict";
import test from "node:test";

import { hasBacktickCharacter } from "./has-backtick-character";
import { hasTildeSign } from "./has-tilde-sign";
import { hasUnderscoreCharacter } from "./has-underscore-character";
import { hasExclamationSign } from "./has-exclamation-sign";
import { hasQuestionMarkSign } from "./has-question-mark-sign";
import { hasSemicolonCharacter } from "./has-semicolon-character";
import { hasCaretSign } from "./has-caret-sign";
import { hasCloseAngle } from "./has-close-angle";
import { hasOpenAngle } from "./has-open-angle";
import { hasSlashCharacter } from "./has-slash-character";
import { hasColonCharacter } from "./has-colon-character";
import { hasPeriodSign } from "./has-period-sign";
import { hasLetterZ } from "./has-letter-z";
import { hasLetterX } from "./has-letter-x";
import { hasLetterC } from "./has-letter-c";
import { hasLetterB } from "./has-letter-b";
import { hasSpaceCharacter } from "./has-space-character";
import { hasNineDigit } from "./has-nine-digit";
import { hasEightDigit } from "./has-eight-digit";
import { hasSevenDigit } from "./has-seven-digit";
import { hasSixDigit } from "./has-six-digit";
import { hasFiveDigit } from "./has-five-digit";
import { hasFourDigit } from "./has-four-digit";
import { hasThreeDigit } from "./has-three-digit";
import { hasTwoDigit } from "./has-two-digit";
import { hasOneDigit } from "./has-one-digit";
import { hasZeroDigit } from "./has-zero-digit";
import { hasHashSign } from "./has-hash-sign";
import { hasAmpersandSign } from "./has-ampersand-sign";
import { hasPipeSign } from "./has-pipe-sign";
import { hasAsteriskSign } from "./has-asterisk-sign";
import { hasUnderscoreSign } from "./has-underscore-sign";
import { hasMinusSign } from "./has-minus-sign";
import { hasCloseParenthesisCharacter } from "./has-close-parenthesis-character";
import { hasOpenParenthesisCharacter } from "./has-open-parenthesis-character";
import { hasCloseBraceCharacter } from "./has-close-brace-character";
import { hasOpenBraceCharacter } from "./has-open-brace-character";
import { hasAtSignCharacter } from "./has-at-sign-character";
import { hasHexPrefix } from "./has-hex-prefix";
import { hasDigitCharacter } from "./has-digit-character";
import { hasLineFeed } from "./has-line-feed";
import { hasNonbreakingSpace } from "./has-nonbreaking-space";
import { hasVerticalTab } from "./has-vertical-tab";
import { hasFormFeed } from "./has-form-feed";
import { hasCarriageReturn } from "./has-carriage-return";

const cases = [
  { name: "hasBacktickCharacter", fn: hasBacktickCharacter, positive: "`", negative: "abc" },
  { name: "hasTildeSign", fn: hasTildeSign, positive: "~", negative: "abc" },
  { name: "hasUnderscoreCharacter", fn: hasUnderscoreCharacter, positive: "_", negative: "abc" },
  { name: "hasExclamationSign", fn: hasExclamationSign, positive: "!", negative: "abc" },
  { name: "hasQuestionMarkSign", fn: hasQuestionMarkSign, positive: "?", negative: "abc" },
  { name: "hasSemicolonCharacter", fn: hasSemicolonCharacter, positive: ";", negative: "abc" },
  { name: "hasCaretSign", fn: hasCaretSign, positive: "^", negative: "abc" },
  { name: "hasCloseAngle", fn: hasCloseAngle, positive: ">", negative: "abc" },
  { name: "hasOpenAngle", fn: hasOpenAngle, positive: "<", negative: "abc" },
  { name: "hasSlashCharacter", fn: hasSlashCharacter, positive: "/", negative: "abc" },
  { name: "hasColonCharacter", fn: hasColonCharacter, positive: ":", negative: "abc" },
  { name: "hasPeriodSign", fn: hasPeriodSign, positive: ".", negative: "abc" },
  { name: "hasLetterZ", fn: hasLetterZ, positive: "z", negative: "abc" },
  { name: "hasLetterX", fn: hasLetterX, positive: "x", negative: "abc" },
  { name: "hasLetterC", fn: hasLetterC, positive: "c", negative: "d" },
  { name: "hasLetterB", fn: hasLetterB, positive: "b", negative: "d" },
  { name: "hasSpaceCharacter", fn: hasSpaceCharacter, positive: "a b", negative: "abc" },
  { name: "hasNineDigit", fn: hasNineDigit, positive: "9", negative: "abc" },
  { name: "hasEightDigit", fn: hasEightDigit, positive: "8", negative: "abc" },
  { name: "hasSevenDigit", fn: hasSevenDigit, positive: "7", negative: "abc" },
  { name: "hasSixDigit", fn: hasSixDigit, positive: "6", negative: "abc" },
  { name: "hasFiveDigit", fn: hasFiveDigit, positive: "5", negative: "abc" },
  { name: "hasFourDigit", fn: hasFourDigit, positive: "4", negative: "abc" },
  { name: "hasThreeDigit", fn: hasThreeDigit, positive: "3", negative: "abc" },
  { name: "hasTwoDigit", fn: hasTwoDigit, positive: "2", negative: "abc" },
  { name: "hasOneDigit", fn: hasOneDigit, positive: "1", negative: "abc" },
  { name: "hasZeroDigit", fn: hasZeroDigit, positive: "0", negative: "abc" },
  { name: "hasHashSign", fn: hasHashSign, positive: "#", negative: "abc" },
  { name: "hasAmpersandSign", fn: hasAmpersandSign, positive: "&", negative: "abc" },
  { name: "hasPipeSign", fn: hasPipeSign, positive: "|", negative: "abc" },
  { name: "hasAsteriskSign", fn: hasAsteriskSign, positive: "*", negative: "abc" },
  { name: "hasUnderscoreSign", fn: hasUnderscoreSign, positive: "_", negative: "abc" },
  { name: "hasMinusSign", fn: hasMinusSign, positive: "-", negative: "abc" },
  { name: "hasCloseParenthesisCharacter", fn: hasCloseParenthesisCharacter, positive: ")", negative: "abc" },
  { name: "hasOpenParenthesisCharacter", fn: hasOpenParenthesisCharacter, positive: "(", negative: "abc" },
  { name: "hasCloseBraceCharacter", fn: hasCloseBraceCharacter, positive: "}", negative: "abc" },
  { name: "hasOpenBraceCharacter", fn: hasOpenBraceCharacter, positive: "{", negative: "abc" },
  { name: "hasAtSignCharacter", fn: hasAtSignCharacter, positive: "@", negative: "abc" },
  { name: "hasHexPrefix", fn: hasHexPrefix, positive: "0xdeadbeef", negative: "abc" },
  { name: "hasDigitCharacter", fn: hasDigitCharacter, positive: "abc1", negative: "abc" },
  { name: "hasLineFeed", fn: hasLineFeed, positive: "a\nb", negative: "abc" },
  { name: "hasNonbreakingSpace", fn: hasNonbreakingSpace, positive: "a b", negative: "abc" },
  { name: "hasVerticalTab", fn: hasVerticalTab, positive: "a\u000bb", negative: "abc" },
  { name: "hasFormFeed", fn: hasFormFeed, positive: "a\fb", negative: "abc" },
  { name: "hasCarriageReturn", fn: hasCarriageReturn, positive: "a\rb", negative: "abc" },
];

test("returns true when the target character is present", () => {
  for (const c of cases) {
    assert.equal(c.fn(c.positive), true, c.name);
  }
});

test("returns false when the target character is absent", () => {
  for (const c of cases) {
    assert.equal(c.fn(c.negative), false, c.name);
  }
});
