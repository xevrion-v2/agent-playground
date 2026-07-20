import { Button } from "./index";

describe("Button", () => {
  it("renders with the given label", () => {
    const result = Button({ label: "Submit" });
    expect(result.label).toBe("Submit");
    expect(result.type).toBe("button");
  });

  it("defaults disabled to false when not provided", () => {
    const result = Button({ label: "Click Me" });
    expect(result.disabled).toBe(false);
  });

  it("applies the disabled prop when set to true", () => {
    const result = Button({ label: "Disabled", disabled: true });
    expect(result.disabled).toBe(true);
  });

  it("applies the disabled prop when set to false", () => {
    const result = Button({ label: "Active", disabled: false });
    expect(result.disabled).toBe(false);
  });

  it("returns an object with type, label, and disabled keys", () => {
    const result = Button({ label: "Test", disabled: true });
    expect(result).toHaveProperty("type");
    expect(result).toHaveProperty("label");
    expect(result).toHaveProperty("disabled");
  });
});
