import assert from "node:assert/strict";
import { test } from "node:test";
import { Children, isValidElement } from "react";

import HomePage from "./page";

test("HomePage renders the TaskFlow heading and supporting copy", () => {
  const page = HomePage();
  assert.equal(page.type, "main");

  const children = Children.toArray(page.props.children);
  const heading = children.find((child) => isValidElement(child) && child.type === "h1");
  const copy = children.find((child) => isValidElement(child) && child.type === "p");

  assert(isValidElement(heading));
  assert(isValidElement(copy));
  assert.equal(heading.props.children, "TaskFlow");
  assert.equal(copy.props.children, "Plan tasks, coordinate jobs, and manage proposals from one workspace.");
});
