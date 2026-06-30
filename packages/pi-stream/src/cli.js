#!/usr/bin/env node

/**
 * CLI for @taskflow/pi-stream
 *
 * Usage:
 *   pi-stream <digits>       — Print PI to N decimal places
 *   pi-stream stream <n>     — Stream N digits one-by-one
 *   pi-stream verify <n>     — Verify PI digits using BBP hex extraction
 *   pi-stream hex <position> — Compute a single BBP hex digit at position
 */

import { getPiString, verifyPiDigits, bbpPiHexDigit } from './index.js';

const [, , command, arg] = process.argv;
const n = parseInt(arg || '100', 10);

async function main() {
  switch (command) {
    case 'stream': {
      // Stream digits one per line (for demo / pipe)
      let count = Math.min(n, 5000);
      const pi = getPiString(count + 50); // compute with buffer
      const digits = pi.slice(2, 2 + count);
      for (const ch of digits) {
        process.stdout.write(ch + '\n');
      }
      break;
    }

    case 'verify': {
      const errors = verifyPiDigits(n);
      const pi = getPiString(n);
      console.log(`π to ${n} decimal places (${pi.length} chars):`);
      console.log(pi.substring(0, 52) + (n > 50 ? '...' : ''));
      console.log();
      if (errors.length === 0) {
        console.log(`✅ BBP verification passed — all ${n} digits are consistent with hex extraction.`);
      } else {
        console.log(`❌ Verification failed at hex position ${errors[0].hexPosition}`);
        console.log(`   Expected hex: ${errors[0].expectedHex}, got: ${errors[0].actualHex}`);
      }
      break;
    }

    case 'hex': {
      const hex = bbpPiHexDigit(n);
      console.log(`BBP hex digit of π at position ${n}: ${hex.toString(16).toUpperCase()}`);
      break;
    }

    default: {
      const pi = getPiString(n);
      const lines = [];
      for (let i = 0; i < pi.length; i += 80) {
        lines.push(pi.slice(i, i + 80));
      }
      console.log(lines.join('\n'));

      if (n > 100) {
        console.log(`\n(π to ${n} decimal places — ${pi.length - 2} digits shown)`);
      }

      // Also print known magic: BBP hex check
      const hex0 = bbpPiHexDigit(0);
      const hex1 = bbpPiHexDigit(1);
      console.log(`\nBBP hex digits: position 0 = ${hex0.toString(16).toUpperCase()}, position 1 = ${hex1.toString(16).toUpperCase()}`);
      break;
    }
  }
}

main().catch(console.error);
