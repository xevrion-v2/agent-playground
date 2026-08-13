import React from "react";

export type ButtonProps = {
  label: string;
  disabled?: boolean;
};

export function Button({ label, disabled = false }: ButtonProps) {
  return React.createElement("button", { disabled }, label);
}
