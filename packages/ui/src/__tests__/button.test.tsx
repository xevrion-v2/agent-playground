import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { render } from "@testing-library/react";
import { Button } from "../src/button";
import { createElement } from "react";

describe("Button component", () => {
  it("renders label text", () => {
    const { container } = render(
      createElement(Button, { label: "Click me" })
    );
    assert.ok(container.textContent.includes("Click me"));
  });

  it("can be disabled", () => {
    const { container } = render(
      createElement(Button, { label: "Submit", disabled: true })
    );
    const button = container.querySelector("button");
    assert.ok(button);
    assert.ok(button.disabled);
  });

  it("is enabled by default", () => {
    const { container } = render(
      createElement(Button, { label: "Save" })
    );
    const button = container.querySelector("button");
    assert.ok(button);
    assert.equal(button.disabled, false);
  });
});
