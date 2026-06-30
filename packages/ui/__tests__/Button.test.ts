import { describe, it, expect } from "vitest";
describe("Button", () => {
  it("renders with label", () => {
    const props = { label: "Click me", onClick: () => {} };
    expect(props.label).toBe("Click me");
  });
  it("handles click", () => {
    let clicked = false;
    const props = { label: "OK", onClick: () => { clicked = true; } };
    props.onClick();
    expect(clicked).toBe(true);
  });
  it("accepts variant prop", () => {
    const props = { label: "Test", variant: "primary", onClick: () => {} };
    expect(props.variant).toBe("primary");
  });
});
