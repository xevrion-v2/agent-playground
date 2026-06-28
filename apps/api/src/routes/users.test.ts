import assert from "node:assert/strict";

import { createUser } from "./users";

const validPayload = {
  email: "\tAlice@TaskFlow.Dev\n",
  name: " Alice   Wonderland   ",
  id: "bad-id-from-client",
  role: "admin"
};

const createdUser = createUser(validPayload);

assert.equal(createdUser.email, "alice@taskflow.dev");
assert.equal(createdUser.name, "Alice Wonderland");
assert.equal(typeof createdUser.id, "string");
assert.equal(createdUser.id.length > 0, true);
assert.equal("role" in createdUser, false);
assert.equal("id" in validPayload ? createdUser.id !== validPayload.id : true, true);

assert.throws(
  () => {
    createUser("not an object");
  },
  /Request body must be a JSON object/
);

assert.throws(
  () => {
    createUser(null);
  },
  /Request body must be a JSON object/
);

assert.throws(
  () => {
    createUser([]);
  },
  /Request body must be a JSON object/
);

assert.throws(
  () => {
    createUser({});
  },
  /email is required and must be a valid email address/
);

assert.throws(
  () => {
    createUser({ email: "not-an-email", name: "x" });
  },
  /email is required and must be a valid email address/
);

assert.throws(
  () => {
    createUser({ email: "user@example.com", name: 42 });
  },
  /name must be a string if provided/
);
