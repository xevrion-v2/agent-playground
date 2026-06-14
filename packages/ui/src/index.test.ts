import { Button } from "./index";

describe("Button", () => {
  it("returns the correct label", () => {
    const result = Button({ label: "Click me" });
    expect(result.label).toBe("Click me");
  });

  it("defaults disabled to false", () => {
    const result = Button({ label: "Click me" });
    expect(result.disabled).toBe(false);
  });

  it("respects disabled when set to true", () => {
    const result = Button({ label: "Click me", disabled: true });
    expect(result.disabled).toBe(true);
  });

  it("always returns type button", () => {
    const result = Button({ label: "Submit" });
    expect(result.type).toBe("button");
  });
});
