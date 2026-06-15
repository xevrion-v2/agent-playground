// Sequence generators
export { naturalNumbers } from './sequences';
export { integersFromZero } from './sequences';
export { fibonacci } from './sequences';
export { primeNumbers } from './sequences';
export { powersOfTwo } from './sequences';
export { customSequence } from './sequences';

// Safe iteration helpers
export { take } from './sequences';
export { takeWhile } from './sequences';
export { elementAt } from './sequences';
export { toArray } from './sequences';
export { forEach } from './sequences';

// Lazy transforms
export { map } from './sequences';
export { filter } from './sequences';
export { scan } from './sequences';
export { zip } from './sequences';

// Utility generators
export { cycle } from './sequences';
export { repeat } from './sequences';

// Types
export type { SequenceGenerator, SequenceTransform, SequencePredicate } from './sequences';

// Documentation
export { SAFE_EXAMPLES, SAFETY_GUIDE } from './sequences';
