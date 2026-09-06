#!/usr/bin/env python3
"""Infinite sequence iterator utility with safe iteration examples."""

from typing import Iterator, TypeVar

T = TypeVar('T')

def infinite_sequence(start: int = 0, step: int = 1) -> Iterator[int]:
    """Generate an infinite sequence of integers.
    
    Args:
        start: First value in the sequence (default 0).
        step: Difference between consecutive values (default 1).
    
    Yields:
        Next integer in the sequence.
    
    Example:
        >>> seq = infinite_sequence()
        >>> [next(seq) for _ in range(5)]
        [0, 1, 2, 3, 4]
    """
    current = start
    while True:
        yield current
        current += step

def take(n: int, iterator: Iterator[T]) -> list[T]:
    """Take n items from an iterator safely.
    
    Args:
        n: Number of items to take.
        iterator: Source iterator.
    
    Returns:
        List of first n items.
    """
    result = []
    for _ in range(n):
        try:
            result.append(next(iterator))
        except StopIteration:
            break
    return result

if __name__ == '__main__':
    seq = infinite_sequence()
    print('First 10:', take(10, seq))
    print('Next 5:', take(5, seq))
    
    evens = infinite_sequence(start=0, step=2)
    print('First 10 even:', take(10, evens))
    
    odds = infinite_sequence(start=1, step=2)
    print('First 10 odd:', take(10, odds))
