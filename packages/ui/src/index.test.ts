import { describe, expect, it } from "vitest";

import { Button } from "./index";

describe("Button", () => {
  it("returns a button stub with the provided label", () => {
    expect(Button({ label: "Save" })).toEqual({
      type: "button",
      label: "Save",
      disabled: false
    });
  });

  it("preserves an explicit disabled value", () => {
    expect(Button({ label: "Delete", disabled: true })).toEqual({
      type: "button",
      label: "Delete",
      disabled: true
    });
  });
});
