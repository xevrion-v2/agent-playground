import { computePi, getCertificate } from './index.js';

console.log("🔢 PI Calculator Demo\n");

console.log("📌 10 digits:");
console.log(computePi(10));

console.log("\n📌 50 digits:");
console.log(computePi(50));

console.log("\n📌 100 digits:");
console.log(computePi(100));

console.log("\n📜 Certificate (100 digits):");
console.log(JSON.stringify(getCertificate(100), null, 2));

console.log("\n⚠️  Note: PI is irrational - infinite decimal expansion cannot be stored in finite space.");
console.log("This calculator computes exact finite prefixes to any requested precision.");
