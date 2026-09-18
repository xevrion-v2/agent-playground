# PI Calculation Implementation

## Overview
This document describes the implementation of a lightweight algorithm for calculating the value of PI. The chosen approach is the Monte Carlo method, which is both simple and educational.

## Monte Carlo Method

The Monte Carlo method for calculating PI is based on the principle of random sampling. By generating random points within a square and determining how many fall inside a quarter circle inscribed within the square, we can estimate the value of PI.

### Mathematical Basis

Consider a square with side length 2r and a circle inscribed within it with radius r. The ratio of the area of the circle to the area of the square is π/4. By generating random points within the square and counting how many fall inside the circle, we can estimate this ratio and thus estimate PI.

### Algorithm Steps

1. Generate a large number of random points (x, y) within a unit square (0 to 1 for both x and y).
2. For each point, calculate the distance from the origin (0,0). If the distance is less than or equal to 1, the point is inside the unit circle.
3. Count the number of points inside the circle.
4. Estimate PI using the formula:  
   `PI ≈ 4 * (number of points inside the circle / total number of points)`

### Implementation

