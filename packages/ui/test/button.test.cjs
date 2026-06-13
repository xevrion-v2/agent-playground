const assert = require("node:assert");
const { describe, it } = require("node:test");
const { Button } = require("../.tmp-test/index.js");

describe("Button", () => {
    it("returns a button model with the provided label", () => {
          assert.deepStrictEqual(Button({ label: "Create task" }), {
                  type: "button",
                  label: "Create task",
                  disabled: false
          });
    });

           it("preserves an explicit disabled value", () => {
                 assert.deepStrictEqual(Button({ label: "Save", disabled: true }), {
                         type: "button",
                         label: "Save",
                         disabled: true
                 });
           });
});
