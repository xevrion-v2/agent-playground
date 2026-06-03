const { execSync } = require('child_process');

console.log("Running Pi calculation test...");

const expected100Digits = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679";

try {
  const result = execSync("node scripts/calculate-pi.js 100").toString().trim();
  if (result === expected100Digits) {
    console.log("✅ Test Passed: Pi calculation matches 100 decimal places perfectly!");
    process.exit(0);
  } else {
    console.error("❌ Test Failed: Expected:");
    console.error(expected100Digits);
    console.error("But got:");
    console.error(result);
    process.exit(1);
  }
} catch (error) {
  console.error("❌ Test Failed with error:", error.message);
  process.exit(1);
}
