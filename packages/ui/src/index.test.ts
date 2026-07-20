import assert from "node:assert/strict";
import test from "node:test";

import { Button } from "./index.ts";

test("Button preserves label and disabled values", () => {
  const enabledButton = Button({ label: "Create task" });
  const disabledButton = Button({ label: "Submit", disabled: true });

  assert.deepEqual(enabledButton, {
    type: "button",
    label: "Create task",
    disabled: false
  });
  assert.deepEqual(disabledButton, {
    type: "button",
    label: "Submit",
    disabled: true
  });
});
