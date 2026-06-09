#!/usr/bin/env node
import { piPrefix } from "./index.js";

const n = parseInt(process.argv[2] || "100", 10);
console.log(piPrefix(n));
