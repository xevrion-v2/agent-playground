import { describe, it, expect } from "vitest";
import { Button } from "./index";

describe("Button", () => {
  it("should render with label and default props", () => {
    const btn = Button({ label: "Click me" });
    expect(btn.label).toBe("Click me");
    expect(btn.disabled).toBe(false);
    expect(btn.variant).toBe("primary");
    expect(btn.size).toBe("md");
    expect(btn.type).toBe("button");
  });

  it("should apply disabled state", () => {
    const btn = Button({ label: "Save", disabled: true });
    expect(btn.disabled).toBe(true);
  });

  it("should accept variant and size", () => {
    const btn = Button({ label: "Delete", variant: "danger", size: "lg" });
    expect(btn.variant).toBe("danger");
    expect(btn.size).toBe("lg");
  });

  it("should accept type submit", () => {
    const btn = Button({ label: "Submit", type: "submit" });
    expect(btn.type).toBe("submit");
  });
});
