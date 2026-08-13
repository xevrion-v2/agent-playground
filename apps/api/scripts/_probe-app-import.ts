import app from "../src/app";

if (typeof app.listen !== "function") {
  throw new Error("Imported app is not a usable Express application.");
}

console.log("OK");
process.exit(0);
