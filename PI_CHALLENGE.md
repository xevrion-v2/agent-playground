# Pi Calculation Challenge

This repository implements a lightweight math challenge to calculate the mathematical constant $\pi$ (Pi) using multiple algorithms with varying levels of convergence speed, resource usage, and mathematical properties.

The challenge is accessible via the Express API endpoint `/pi`.

---

## 🛠️ API Endpoint

### `GET /pi`

Allows requesting a Pi calculation. 

#### **Query Parameters**
- `method` (string, optional): The algorithm to use. Supported options:
  - `nilakantha` (Default): The Nilakantha series. Converges very quickly.
  - `leibniz`: The Leibniz formula. Simple alternating series, but converges extremely slowly.
  - `montecarlo`: A Monte Carlo simulation. Estimates $\pi$ probabilistically using random point coordinates.
- `iterations` (number, optional): The number of iterations or points to use for the calculation.
  - Default: `100000` (100k)
  - Allowed range: `1` to `10000000` (10 million)

---

## 📐 Implemented Algorithms

### 1. Nilakantha Series (Default)
The Nilakantha series is an infinite series that converges to $\pi$ significantly faster than the Leibniz formula.
$$\pi = 3 + \frac{4}{2 \times 3 \times 4} - \frac{4}{4 \times 5 \times 6} + \frac{4}{6 \times 7 \times 8} - \frac{4}{8 \times 9 \times 10} + \dots$$

- **Pros**: Rapid convergence. High accuracy is achieved with relatively few iterations.
- **Cons**: Requires fractional divisions and slightly more complex term calculation per loop.

### 2. Leibniz Formula
The Leibniz formula is a simple infinite series that alternates signs and sums reciprocals of odd numbers.
$$\pi = 4 \times \left(1 - \frac{1}{3} + \frac{1}{5} - \frac{1}{7} + \frac{1}{9} - \dots\right)$$

- **Pros**: Extremely simple implementation.
- **Cons**: Exceptionally slow convergence. 100,000 iterations are barely enough to get 4 decimal places of accuracy.

### 3. Monte Carlo Simulation
The Monte Carlo method estimates $\pi$ by generating random points $(x, y)$ within a unit square $[0, 1] \times [0, 1]$ and checking if they lie inside a quarter-unit circle ($x^2 + y^2 \le 1$). The ratio of points inside the circle to total points is approximately $\frac{\pi}{4}$.
$$\pi \approx 4 \times \frac{\text{Points Inside Circle}}{\text{Total Points}}$$

- **Pros**: Easy to understand, parallelizable, and provides an interesting probabilistic demonstration of the constant.
- **Cons**: High computational complexity for low accuracy (slow convergence rate of $O(1/\sqrt{N})$).

---

## 💻 Request & Response Examples

### Nilakantha (Fast Convergence)
**Request:**
```bash
curl "http://localhost:4000/pi?method=nilakantha&iterations=10000"
```

**Response:**
```json
{
  "success": true,
  "method": "nilakantha",
  "iterations": 10000,
  "pi": 3.141592653589787,
  "accuracy": 5.773159728050814e-15,
  "timeMs": 0.2319,
  "description": "Nilakantha Series: Converges rapidly by adding alternating fractions with product denominators."
}
```

### Monte Carlo (Probabilistic)
**Request:**
```bash
curl "http://localhost:4000/pi?method=montecarlo&iterations=100000"
```

**Response:**
```json
{
  "success": true,
  "method": "montecarlo",
  "iterations": 100000,
  "pi": 3.14328,
  "accuracy": 0.001687346410206847,
  "timeMs": 2.1485,
  "description": "Monte Carlo Simulation: Probabilistic estimation based on the ratio of random points landing inside a quadrant of a unit circle.",
  "details": {
    "pointsInsideCircle": 78582,
    "totalPoints": 100000
  }
}
```
