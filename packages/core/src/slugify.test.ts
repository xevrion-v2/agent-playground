import assert from "node:assert/strict";

import { slugify } from "./index.ts";

assert.equal(slugify("TaskFlow Profile URL"), "taskflow-profile-url");
assert.equal(slugify("  Café au lait  "), "cafe-au-lait");
assert.equal(slugify("TaskFlow --- API___Foundation"), "taskflow-api-foundation");
assert.equal(slugify("Already--Slugged"), "already-slugged");
assert.equal(slugify("!!!"), "");
