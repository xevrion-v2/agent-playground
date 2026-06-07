#!/usr/bin/env python3
"""
Infinite Sequence Iterator

Provides safe, documented infinite sequence generators with
iteration control and usage examples.

Features:
- Infinite counter (1, 2, 3, ...)
- Fibonacci sequence
- Geometric progression
- Arithmetic progression
- Toggleable upper bound for safety
"""

from typing import Iterator, Optional, Union


def infinite_counter(start: int = 0, step: int = 1) -> Iterator[int]:
    """Yield an infinite sequence of integers.

    Args:
        start: First value (default 0).
        step: Increment between values (default 1).

    Yields:
        Integers indefinitely.

    Example:
        >>> from itertools import islice
        >>> list(islice(infinite_counter(1), 5))
        [1, 2, 3, 4, 5]
    """
    current = start
    while True:
        yield current
        current += step


def fibonacci() -> Iterator[int]:
    """Yield the Fibonacci sequence (0, 1, 1, 2, 3, 5, 8, ...).

    Yields:
        Fibonacci numbers indefinitely.

    Example:
        >>> from itertools import islice
        >>> list(islice(fibonacci(), 8))
        [0, 1, 1, 2, 3, 5, 8, 13]
    """
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b


def geometric(ratio: float, start: float = 1.0) -> Iterator[float]:
    """Yield a geometric progression.

    Args:
        ratio: Multiplier for each step.
        start: First value (default 1.0).

    Yields:
        Geometric progression indefinitely.

    Example:
        >>> from itertools import islice
        >>> list(islice(geometric(2), 6))
        [1.0, 2.0, 4.0, 8.0, 16.0, 32.0]
    """
    current = start
    while True:
        yield current
        current *= ratio


def arithmetic(difference: float, start: float = 0.0) -> Iterator[float]:
    """Yield an arithmetic progression.

    Args:
        difference: Value added at each step.
        start: First value (default 0.0).

    Yields:
        Arithmetic progression indefinitely.

    Example:
        >>> from itertools import islice
        >>> list(islice(arithmetic(3, 1), 5))
        [1.0, 4.0, 7.0, 10.0, 13.0]
    """
    current = start
    while True:
        yield current
        current += difference


def bounded(iterator: Iterator, limit: int) -> Iterator:
    """Wrap an infinite iterator with an upper bound for safety.

    Args:
        iterator: Any iterator (infinite or finite).
        limit: Maximum number of items to yield.

    Yields:
        Items from the wrapped iterator, up to `limit` items.

    Example:
        >>> list(bounded(infinite_counter(1), 3))
        [1, 2, 3]
    """
    for i, val in enumerate(iterator):
        if i >= limit:
            break
        yield val


if __name__ == "__main__":
    from itertools import islice

    print("=== Infinite Sequence Iterator Demo ===")
    print(f"Counter:    {list(islice(infinite_counter(1), 10))}")
    print(f"Fibonacci:  {list(islice(fibonacci(), 10))}")
    print(f"Geometric:  {list(islice(geometric(2), 6))}")
    print(f"Arithmetic: {list(islice(arithmetic(3, 1), 6))}")
    print(f"Bounded:    {list(bounded(fibonacci(), 8))}")
