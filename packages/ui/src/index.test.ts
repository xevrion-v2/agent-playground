import { Button } from "./index";

describe("Button stub", () => {
  it("should return the correct label and default disabled state", () => {
    const button = Button({ label: "Click Me" });
    expect(button.type).toBe("button");
    expect(button.label).toBe("Click Me");
    expect(button.disabled).toBe(false);
  });

  it("should return the correct disabled state when provided", () => {
    const button = Button({ label: "Submit", disabled: true });
    expect(button.type).toBe("button");
    expect(button.label).toBe("Submit");
    expect(button.disabled).toBe(true);
  });
});
