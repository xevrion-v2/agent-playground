import app from "./app";

if (typeof app.listen !== "function") {
  throw new Error("Expected Express app to expose listen()");
}

console.log("Express app imported without starting a listener");
