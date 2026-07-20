// Simple unit tests for the Button stub component
// The Button returns a plain object (not JSX) so we test it directly

function Button({ label, disabled = false }) {
  return { type: "button", label, disabled };
}

describe("Button component", () => {
  it("returns correct type", () => {
    const result = Button({ label: "Click me" });
    expect(result.type).toBe("button");
  });

  it("passes label through", () => {
    const result = Button({ label: "Submit" });
    expect(result.label).toBe("Submit");
  });

  it("defaults disabled to false", () => {
    const result = Button({ label: "OK" });
    expect(result.disabled).toBe(false);
  });

  it("respects disabled=true", () => {
    const result = Button({ label: "Save", disabled: true });
    expect(result.disabled).toBe(true);
  });

  it("respects disabled=false explicitly", () => {
    const result = Button({ label: "Cancel", disabled: false });
    expect(result.disabled).toBe(false);
  });

  it("handles empty label", () => {
    const result = Button({ label: "" });
    expect(result.label).toBe("");
  });
});
