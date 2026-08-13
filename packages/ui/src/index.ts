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

export {
  createArithmeticSequence,
  createInfiniteSequence,
  type InfiniteSequence,
  type SequenceGenerator
} from "./sequence";
