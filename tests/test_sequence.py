import unittest
from scripts.infinite_sequence import InfiniteSequence

class TestInfiniteSequence(unittest.TestCase):
    def test_default_sequence(self):
        seq = InfiniteSequence()
        self.assertEqual(seq.safe_take(5), [0, 1, 2, 3, 4])
        
    def test_custom_step_sequence(self):
        seq = InfiniteSequence(start=10, step=5)
        self.assertEqual(seq.safe_take(4), [10, 15, 20, 25])
        
    def test_safe_limit(self):
        seq = InfiniteSequence()
        # Default safety limit works
        self.assertEqual(len(seq.safe_take(200)), 200)

if __name__ == '__main__':
    unittest.main()
