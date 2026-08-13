import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import HomePage from "./page";

test("homepage renders TaskFlow heading and supporting copy", () => {
  const html = renderToStaticMarkup(createElement(HomePage));

  assert.match(html, /<h1>TaskFlow<\/h1>/);
  assert.match(
    html,
    /Plan tasks, coordinate jobs, and manage proposals from one workspace\./,
  );
});
