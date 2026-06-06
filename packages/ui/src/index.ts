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
// Infinite sequence iterator utility

/**
 * Creates an infinite sequence iterator starting from a given number
 * @param start - The starting number for the sequence (default: 0)
 * @param step - The step size between sequence numbers (default: 1)
 * @returns An object with a next() method to get the next value in the sequence
 */
export function createInfiniteSequence(start = 0, step = 1) {
  let current = start;
  
  return {
    next: () => {
      const value = current;
      current += step;
      return value;
    },
    reset: (newStart = start) => {
      current = newStart;
    }
  };
}

/**
 * Utility function to safely iterate through n items in an infinite sequence
 * @param sequence - The sequence iterator object
 * @param n - Number of items to iterate through
 * @param callback - Function to call on each item
 */
export function iterateSafely(sequence: ReturnType<typeof createInfiniteSequence>, n: number, callback: (value: number) => void) {
  for (let i = 0; i < n; i++) {
    callback(sequence.next());
  }
}

// Example usage:
// const seq = createInfiniteSequence(1, 2);
// iterateSafely(seq, 5, (value) => console.log(value));
// Output: 1, 3, 5, 7, 9

// Reset example:
// seq.reset(0);
}
