import assert from "node:assert/strict";
import test from "node:test";

import { Button } from "./index";

test("Button returns label and disabled state", () => {
  assert.deepEqual(Button({ label: "Save" }), {
    type: "button",
    label: "Save",
    disabled: false
  });

  assert.deepEqual(Button({ label: "Submit", disabled: true }), {
    type: "button",
    label: "Submit",
    disabled: true
  });
});
