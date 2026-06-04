import unittest
from scripts.calculate_pi import calculate_pi

class TestPiCalculation(unittest.TestCase):
    def test_pi_digits(self):
        # 10 digits of pi: 3.141592653
        self.assertEqual(calculate_pi(10), "3.141592653")
        
        # 20 digits of pi
        self.assertEqual(calculate_pi(20), "3.1415926535897932384")

        # 50 digits of pi
        expected_50 = "3.1415926535897932384626433832795028841971693993751"
        self.assertEqual(calculate_pi(50), expected_50)

if __name__ == '__main__':
    unittest.main()
