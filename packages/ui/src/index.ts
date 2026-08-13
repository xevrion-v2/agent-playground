export type ButtonProps = {
  label: string;
  disabled?: boolean;
};

export function Button({ label, disabled = false }: ButtonProps) {
  return {
    type: "button",
    label,
    disabled
  };
}

export { countFrom, generate, repeat, take } from "./infiniteSequence.js";
export type { InfiniteSequence } from "./infiniteSequence.js";
