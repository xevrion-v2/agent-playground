#!/usr/bin/env node
import { performance } from "node:perf_hooks"
import { calculatePiPrefix, formatPiChunks } from "./index.js"

const rawDigits = process.argv[2] ?? "100"
const rawLineWidth = process.argv[3] ?? "80"
const decimalDigits = Number(rawDigits)
const lineWidth = Number(rawLineWidth)

try {
  const startedAt = performance.now()
  const pi = calculatePiPrefix(decimalDigits)
  const elapsedMs = Math.round(performance.now() - startedAt)

  console.log(formatPiChunks(pi, { lineWidth }))
  console.log("")
  console.log(`digits_after_decimal=${decimalDigits}`)
  console.log(`elapsed_ms=${elapsedMs}`)
  console.log(
    "note=pi is infinite; this is the exact finite prefix for the requested precision",
  )
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error))
  process.exitCode = 1
}
