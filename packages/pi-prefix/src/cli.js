#!/usr/bin/env node
import {
  calculatePiDigits,
  certifyPiPrefix,
  chunkPiPrefix,
  verifyKnownPrefix
} from './index.js';

function printHelp() {
  console.log(`Usage: taskflow-pi-prefix [digits] [--chunk-size N] [--json]

Calculates a finite decimal prefix of pi with deterministic integer arithmetic.

Examples:
  taskflow-pi-prefix 100
  taskflow-pi-prefix 250 --chunk-size 25 --json`);
}

function parseArgs(argv) {
  const args = {
    digits: 100,
    chunkSize: 10,
    json: false,
    seenDigits: false
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === '--help' || arg === '-h') {
      args.help = true;
      continue;
    }

    if (arg === '--json') {
      args.json = true;
      continue;
    }

    if (arg === '--chunk-size') {
      index += 1;
      args.chunkSize = Number.parseInt(argv[index], 10);
      continue;
    }

    if (!arg.startsWith('-') && !args.seenDigits) {
      args.digits = Number.parseInt(arg, 10);
      args.seenDigits = true;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return args;
}

try {
  const args = parseArgs(process.argv.slice(2));
  delete args.seenDigits;

  if (args.help) {
    printHelp();
    process.exit(0);
  }

  const value = calculatePiDigits(args.digits);
  const certificate = certifyPiPrefix(value);
  const result = {
    value,
    certificate,
    chunks: chunkPiPrefix(value, args.chunkSize),
    known100DigitPrefixVerified: verifyKnownPrefix()
  };

  if (args.json) {
    console.log(JSON.stringify(result, null, 2));
  } else {
    console.log(value);
    console.log(`digits: ${certificate.numericDigits}`);
    console.log(`fractional_digits: ${certificate.fractionalDigits}`);
    console.log(`sha256: ${certificate.sha256}`);
    console.log(`known_100_digit_prefix_verified: ${result.known100DigitPrefixVerified}`);
  }
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
