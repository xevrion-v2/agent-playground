class InfiniteSequence:
    """
    A utility for creating infinite sequences with safe iteration limits
    to prevent runaway loops in client code.
    """
    def __init__(self, start=0, step=1):
        self.start = start
        self.step = step
        
    def generate(self):
        """Generator that yields sequence values infinitely."""
        current = self.start
        while True:
            yield current
            current += self.step

    def safe_take(self, limit=100):
        """
        Safely takes up to `limit` values from the infinite sequence,
        ensuring the iteration terminates.
        """
        gen = self.generate()
        result = []
        for _ in range(limit):
            result.append(next(gen))
        return result

if __name__ == '__main__':
    seq = InfiniteSequence(start=1, step=2)
    print("Generating first 10 odd numbers safely:")
    print(seq.safe_take(10))
