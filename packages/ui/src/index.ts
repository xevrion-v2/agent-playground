import * as React from "react";

export type ButtonProps = {
  label: string;
  disabled?: boolean;
};

export function Button({ label, disabled = false }: ButtonProps): React.ReactElement {
  return React.createElement("button", { type: "button", disabled }, label);
}
