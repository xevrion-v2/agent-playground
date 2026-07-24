import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";

import { Button } from "./index.ts";

test("Button renders a JSX button element", () => {
  const html = renderToStaticMarkup(Button({ label: "Save", disabled: true }));
  assert.match(html, /<button[^>]*disabled[^>]*>Save<\/button>/);
});

test("Button renders enabled state by default", () => {
  const html = renderToStaticMarkup(Button({ label: "Go" }));
  assert.match(html, /<button[^>]*>Go<\/button>/);
  assert.doesNotMatch(html, /disabled/);
});
