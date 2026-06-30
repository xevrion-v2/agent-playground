/**
 * Infinite sequence iterator.
 *
 * Provides {@link naturalNumbers}, {@link fibonacci}, and {@link cycle}
 * — three infinite iterator factories.
 *
 * @example
 * ```ts
 * import { naturalNumbers, fibonacci, cycle } from "./infinite-iterator";
 *
 * const nums = naturalNumbers();
 * nums.next().value; // 0
 *
 * const fib = fibonacci();
 * fib.next().value; // 0
 *
 * const rgb = cycle(["r", "g", "b"]);
 * rgb.next().value; // "r"
 * ```
 */
export {
  naturalNumbers,
  fibonacci,
  cycle,
} from "./infinite-iterator";

export type {
  InfiniteIterator,
  InfiniteIteratorStep,
} from "./infinite-iterator";
