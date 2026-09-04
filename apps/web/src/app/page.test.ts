import assert from "node:assert/strict";
import test from "node:test";

import { metadata } from "./page";

test("homepage exports SEO metadata", () => {
  assert.equal(metadata.title, "TaskFlow | Task Management Workspace");
  assert.equal(
    metadata.description,
    "Plan tasks, coordinate jobs, and manage proposals from one workspace.",
  );
});
