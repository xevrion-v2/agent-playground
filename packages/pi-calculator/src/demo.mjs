import { computePi, getCertificate } from './index.js';

console.log("🔢 PI Calculator — Chudnovsky Algorithm Demo\n");

console.log("📌 100 digits:");
console.log(computePi(100));

console.log("\n📌 1,000 digits:");
console.log(computePi(1000));

console.log("\n📌 10,000 digits (computing...):");
const start = Date.now();
const pi10k = computePi(10000);
const time = Date.now() - start;
console.log(pi10k.slice(0, 100) + "...");
console.log(`\n⚡ Computed 10,000 digits in ${time}ms`);

console.log("\n📜 Certificate:");
console.log(JSON.stringify(getCertificate(100), null, 2));

console.log("\n⚠️  Note: PI is irrational — infinite decimal expansion");
console.log("cannot be stored in finite space. This computes exact");
console.log("FINITE prefixes to any requested precision.");
