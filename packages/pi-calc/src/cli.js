#!/usr/bin/env node
/**
 * CLI entry point for @taskflow/pi-calc.
 *
 * Usage:
 *   node packages/pi-calc/src/cli.js 100
 *   node packages/pi-calc/src/cli.js 1000 --json
 */
import { runCLI } from "./index.js";
runCLI(process.argv.slice(2));
