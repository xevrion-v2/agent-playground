class InfiniteSequenceIterator:
    """An infinite iterator that yields a sequence of numbers starting from `start`, incrementing by `step`."""
    
    def __init__(self, start: int = 0, step: int = 1):
        """
        Initialize the infinite sequence iterator.
        
        Args:
            start: The starting value of the sequence (default: 0)
            step: The increment between consecutive values (default: 1)
        """
        self.current = start
        self.step = step
    
    def __iter__(self):
        """Return the iterator object itself."""
        return self
    
    def __next__(self):
        """Return the next value in the sequence."""
        value = self.current
        self.current += self.step
        return value