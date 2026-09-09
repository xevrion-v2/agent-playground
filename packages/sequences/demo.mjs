import { fibonacci, mapSequence, naturals, take } from "./src/index.mjs";

const firstTenNaturals = take(naturals(1), 10);
const firstTenFibonacci = take(fibonacci(), 10);
const firstFiveEvenNumbers = take(mapSequence(naturals(1), value => value * 2), 5);

console.log("naturals:", firstTenNaturals.join(", "));
console.log("fibonacci:", firstTenFibonacci.join(", "));
console.log("evens:", firstFiveEvenNumbers.join(", "));
