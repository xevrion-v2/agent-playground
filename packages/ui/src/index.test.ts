import { describe, expect, it } from "vitest";

import { Button } from "./index";

describe("Button stub", () => {
  it("returns the default button contract", () => {
    expect(Button({ label: "Create task" })).toEqual({
      type: "button",
      label: "Create task",
      disabled: false,
    });
  });

  it("preserves the disabled value when provided", () => {
    expect(Button({ label: "Archive task", disabled: true })).toEqual({
      type: "button",
      label: "Archive task",
      disabled: true,
    });
  });
});
