# Infinite Sequence Iterator Utility

This folder contains a lightweight utility for working with infinite mathematical sequences safely in client code.

## Key Features

- **Lazy Evaluation**: Sequence elements are generated one by one using Python generator yielding.
- **Safe Evaluation Boundary**: Provides a `safe_take()` method to enforce a loop limit, protecting against thread-blocking infinite loops.

## Example Usage

```python
from scripts.infinite_sequence import InfiniteSequence

# Create a sequence of multiples of 5 starting from 0
seq = InfiniteSequence(start=0, step=5)

# Safely extract the first 10 elements
values = seq.safe_take(10)
print(values)  # Output: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45]
```
