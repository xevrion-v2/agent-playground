# PI Calculator (Monte Carlo)

A lightweight application that estimates the value of **π** using the Monte Carlo method.

## How It Works

1. Generate random (x, y) points in the unit square [0,1] × [0,1].
2. Count how many fall inside the quarter circle (x² + y² ≤ 1).
3. The ratio `inside / total ≈ π / 4`, so `π ≈ 4 × ratio`.

## Usage

```bash
npx ts-node src/pi.ts [samples]
```

- `samples` — number of random points (default: 100,000)

## Example

```
$ npx ts-node src/pi.ts 1000000
Estimated π ≈ 3.141828  (samples: 1000000, error: 0.000235)
```
