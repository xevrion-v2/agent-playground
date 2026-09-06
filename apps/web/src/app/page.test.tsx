import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import HomePage from "./page";

describe("HomePage", () => {
  it("renders the TaskFlow heading and supporting copy", () => {
    const html = renderToStaticMarkup(<HomePage />);

    expect(html).toContain("<h1>TaskFlow</h1>");
    expect(html).toContain(
      "Plan tasks, coordinate jobs, and manage proposals from one workspace.",
    );
  });
});
