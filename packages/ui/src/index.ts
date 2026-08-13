import { createElement, type ReactElement } from "react";

export type ButtonProps = {
  label: string;
  disabled?: boolean;
};

/** Shared Button stub used by the web app until real UI primitives land. */
export function Button({ label, disabled = false }: ButtonProps): ReactElement {
  return createElement(
    "button",
    { type: "button", disabled },
    label,
  );
}
