/**
 * verify-headers.mjs
 *
 * Validates that next.config.mjs defines the four baseline security
 * response headers required by the acceptance criteria in issue #1119.
 *
 * Usage: node apps/web/scripts/verify-headers.mjs
 */

import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const configPath = resolve(__dirname, '../next.config.mjs');

let failed = false;

try {
  const src = readFileSync(configPath, 'utf-8');

  const required = [
    { header: 'X-Frame-Options', purpose: 'clickjacking protection' },
    { header: 'X-Content-Type-Options', purpose: 'MIME-sniffing protection' },
    { header: 'Referrer-Policy', purpose: 'referrer-leak control' },
    { header: 'Permissions-Policy', purpose: 'browser feature restriction' },
  ];

  for (const { header, purpose } of required) {
    if (!src.includes(header)) {
      console.error(`FAIL: "${header}" (${purpose}) is not configured in next.config.mjs`);
      failed = true;
    } else {
      console.log(`PASS: "${header}" (${purpose}) is present`);
    }
  }

  // Verify the headers() function is exported
  if (!src.includes('async headers()') && !src.includes('headers:')) {
    console.error('FAIL: headers() function or headers key not found in next.config.mjs');
    failed = true;
  } else {
    console.log('PASS: headers() configuration detected');
  }
} catch (err) {
  console.error('ERROR reading next.config.mjs:', err.message);
  process.exit(1);
}

if (failed) {
  console.error('\nOne or more security headers are missing.');
  process.exit(1);
}

console.log('\nAll baseline security headers are properly configured.');
