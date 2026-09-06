class InfiniteSequenceIterator:
    """
    An infinite sequence iterator that generates values based on a given function.
    
    Supports arithmetic sequences (with start, step), geometric sequences,
    or custom functions for generating the next value in the sequence.
    """
    
    def __init__(self, start=0, step=1, stop=None, func=None):
        """
        Initialize the infinite sequence iterator.
        
        Args:
            start: Starting value of the sequence
            step: Step size (for arithmetic sequences)
            stop: Optional stopping condition
            func: Custom function to generate next value (overrides start/step)
        """
        self.start = start
        self.step = step
        self.stop = stop
        self.func = func
        self.current = start
        
    def __iter__(self):
        """Return the iterator object."""
        return self
        
    def __next__(self):
        """Generate and return the next value in the sequence."""
        if self.stop is not None and self.current >= self.stop:
            raise StopIteration
            
        if self.func is not None:
            # Use custom function to generate next value
            value = self.current
            self.current = self.func(self.current)
            return value
        else:
            # Use arithmetic sequence (start + n * step)
            value = self.current
            self.current += self.step
            return value

# Example usage:
# Arithmetic sequence: 0, 1, 2, 3, ...
# seq1 = InfiniteSequenceIterator(0, 1)
# 
# Geometric sequence: 1, 2, 4, 8, ...
# seq2 = InfiniteSequenceIterator(1, 1, func=lambda x: x * 2)
# 
# Custom sequence with stop condition
# seq3 = InfiniteSequenceIterator(0, 1, stop=10)