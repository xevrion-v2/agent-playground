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
  createInfiniteSequence,
  takeFromSequence,
  type InfiniteSequence,
  type InfiniteSequenceOptions,
} from "./infinite-sequence";
