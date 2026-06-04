import { describe, it, expect } from "vitest";

describe("@taskflow/ui — Button", () => {
  it("creates a button with the given label", async () => {
    const { Button } = await import("../src/index");
    const btn = Button({ label: "Click me" });
    expect(btn).toHaveProperty("label", "Click me");
  });

  it("defaults disabled to false", async () => {
    const { Button } = await import("../src/index");
    const btn = Button({ label: "Go" });
    expect(btn).toHaveProperty("disabled", false);
  });

  it("sets disabled when true is passed", async () => {
    const { Button } = await import("../src/index");
    const btn = Button({ label: "Save", disabled: true });
    expect(btn).toHaveProperty("disabled", true);
  });

  it("returns an object with type 'button'", async () => {
    const { Button } = await import("../src/index");
    const btn = Button({ label: "test" });
    expect(btn).toHaveProperty("type", "button");
  });

  it("preserves additional props passed through", async () => {
    const { Button } = await import("../src/index");
    const btn = Button({ label: "Test", disabled: false, onClick: "cb" } as any);
    expect(btn).toMatchObject({
      type: "button",
      label: "Test",
      disabled: false,
    });
  });
});
