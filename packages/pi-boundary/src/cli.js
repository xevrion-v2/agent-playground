#!/usr/bin/env node

import { buildPiCertificate, chunkDecimalPrefix, explainNoFinalDigit } from './index.js';

function usage() {
  return [
    'Usage: node packages/pi-boundary/src/cli.js <digits> [--chunk-size <n>] [--json]',
    '',
    'Examples:',
    '  node packages/pi-boundary/src/cli.js 100',
    '  node packages/pi-boundary/src/cli.js 1000 --chunk-size 25 --json'
  ].join('\n');
}

function readArgs(argv) {
  const args = [...argv];
  const result = {
    digits: undefined,
    chunkSize: 10,
    json: false
  };

  while (args.length > 0) {
    const arg = args.shift();
    if (arg === '--help' || arg === '-h') {
      result.help = true;
    } else if (arg === '--json') {
      result.json = true;
    } else if (arg === '--chunk-size') {
      result.chunkSize = Number(args.shift());
    } else if (arg?.startsWith('--chunk-size=')) {
      result.chunkSize = Number(arg.slice('--chunk-size='.length));
    } else if (result.digits === undefined) {
      result.digits = Number(arg);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return result;
}

try {
  const args = readArgs(process.argv.slice(2));
  if (args.help || args.digits === undefined) {
    console.log(usage());
    process.exit(args.help ? 0 : 1);
  }

  const started = performance.now();
  const certificate = buildPiCertificate(args.digits);
  const elapsedMs = Math.round((performance.now() - started) * 1000) / 1000;
  const chunks = chunkDecimalPrefix(certificate.prefix, args.chunkSize);
  const output = {
    ...certificate,
    elapsedMs,
    chunkSize: args.chunkSize,
    formattedPrefix: chunks.formatted
  };

  if (args.json) {
    console.log(JSON.stringify(output, null, 2));
  } else {
    console.log(`pi prefix (${certificate.digits} fractional digits)`);
    console.log(chunks.formatted);
    console.log();
    console.log(`sha256: ${certificate.sha256}`);
    console.log(`known-prefix-match: ${certificate.knownPrefixMatches}`);
    console.log(`elapsed-ms: ${elapsedMs}`);
    console.log();
    console.log(explainNoFinalDigit());
  }
} catch (error) {
  console.error(error.message);
  console.error();
  console.error(usage());
  process.exit(1);
}
