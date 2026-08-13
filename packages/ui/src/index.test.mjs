import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";

const source = readFileSync(new URL("./index.ts", import.meta.url), "utf8")
  .replace(/export type ButtonProps = \{[\s\S]*?\};\s*/, "")
  .replace("export function Button", "function Button")
  .replace(/\}: ButtonProps\)/, "})");

const context = {};
vm.runInNewContext(`${source}\nglobalThis.Button = Button;`, context);

const { Button } = context;

test("Button returns the provided label", () => {
  const result = Button({ label: "Save" });

  assert.equal(result.type, "button");
  assert.equal(result.label, "Save");
  assert.equal(result.disabled, false);
});

test("Button preserves an explicit disabled value", () => {
  const result = Button({ label: "Save", disabled: true });

  assert.equal(result.type, "button");
  assert.equal(result.label, "Save");
  assert.equal(result.disabled, true);
});
