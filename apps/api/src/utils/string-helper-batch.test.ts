import assert from "node:assert/strict";
import test from "node:test";

import { compactArray } from "./compact-array";
import { endsWithAny } from "./ends-with-any";
import { ensureArray } from "./ensure-array";
import { lowercaseRecordKeys } from "./lowercase-record-keys";
import { omitUndefined } from "./omit-undefined";
import { pickDefinedValues } from "./pick-defined-values";
import { rangeNumber } from "./range-number";
import { removePrefix } from "./remove-prefix";
import { removeSuffix } from "./remove-suffix";
import { startsWithAny } from "./starts-with-any";
import { titleCase } from "./title-case";
import { uniqueStrings } from "./unique-strings";

test("endsWithAny checks any non-empty suffix", () => {
  assert.equal(endsWithAny("agent-playground", ["ground", "", "play"]), true);
  assert.equal(endsWithAny("agent-playground", ["", "agent"]), false);
});

test("startsWithAny checks any non-empty prefix", () => {
  assert.equal(startsWithAny("agent-playground", ["agent", ""]), true);
  assert.equal(startsWithAny("agent-playground", ["", "play"]), false);
});

test("removePrefix removes only matching prefixes", () => {
  assert.equal(removePrefix("agent-playground", "agent-"), "playground");
  assert.equal(removePrefix("agent-playground", "play"), "agent-playground");
});

test("removeSuffix removes only matching suffixes", () => {
  assert.equal(removeSuffix("agent-playground", "-playground"), "agent");
  assert.equal(removeSuffix("agent-playground", "agent"), "agent-playground");
});

test("ensureArray always returns a mutable array", () => {
  const source = ["a", "b"] as const;
  const single = ensureArray("value");
  const existing = ensureArray(source);

  assert.deepEqual(ensureArray(null), []);
  assert.deepEqual(ensureArray(undefined), []);
  assert.deepEqual(single, ["value"]);
  assert.deepEqual(existing, ["a", "b"]);
  assert.notStrictEqual(existing, source);
});

test("compactArray removes nullish values", () => {
  const values = compactArray(["a", null, undefined, "b"]);

  assert.deepEqual(values, ["a", "b"]);
});

test("uniqueStrings preserves first-seen order", () => {
  assert.deepEqual(uniqueStrings(["b", "a", "b", "c", "a"]), ["b", "a", "c"]);
});

test("titleCase capitalizes word starts", () => {
  assert.equal(titleCase("hello world from codex"), "Hello World From Codex");
});

test("lowercaseRecordKeys lowercases keys", () => {
  assert.deepEqual(lowercaseRecordKeys({ Foo: 1, BarBaz: "x" }), { foo: 1, barbaz: "x" });
});

test("omitUndefined removes undefined values", () => {
  assert.deepEqual(omitUndefined({ a: 1, b: undefined, c: "x" }), { a: 1, c: "x" });
});

test("pickDefinedValues mirrors omitUndefined", () => {
  assert.deepEqual(pickDefinedValues({ a: 1, b: undefined, c: "x" }), { a: 1, c: "x" });
});

test("rangeNumber builds inclusive ranges in either direction", () => {
  assert.deepEqual(rangeNumber(1, 4), [1, 2, 3, 4]);
  assert.deepEqual(rangeNumber(4, 1), [4, 3, 2, 1]);
  assert.deepEqual(rangeNumber(1, 5, 2), [1, 3, 5]);
});

test("rangeNumber rejects invalid step values", () => {
  assert.throws(() => rangeNumber(1, 3, 0), /step must not be 0/);
});
