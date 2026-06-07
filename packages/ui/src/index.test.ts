import { Button, ButtonProps } from "./index";

describe("Button", () => {
  it("should return an object with the provided label", () => {
    const result = Button({ label: "Submit" });
    expect(result.label).toBe("Submit");
  });

  it("should default disabled to false", () => {
    const result = Button({ label: "Click" });
    expect(result.disabled).toBe(false);
  });

  it("should return disabled true when explicitly set", () => {
    const result = Button({ label: "Click", disabled: true });
    expect(result.disabled).toBe(true);
  });

  it("should always have type 'button'", () => {
    const result = Button({ label: "OK" });
    expect(result.type).toBe("button");
  });
});
