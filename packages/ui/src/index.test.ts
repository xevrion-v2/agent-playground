import assert from "node:assert/strict";
import { Button, type ButtonProps } from "./index";

// Test 1: Button returns correct type field
{
  const result = Button({ label: "Click me" });
  assert.equal(result.type, "button", "Button should return type 'button'");
}

// Test 2: Button passes through label
{
  const result = Button({ label: "Submit" });
  assert.equal(result.label, "Submit", "Button should pass through label");
}

// Test 3: Button defaults disabled to false
{
  const result = Button({ label: "Test" });
  assert.equal(result.disabled, false, "Button should default disabled to false");
}

// Test 4: Button respects disabled=true
{
  const result = Button({ label: "Disabled", disabled: true });
  assert.equal(result.disabled, true, "Button should respect disabled=true");
}

// Test 5: Button respects disabled=false explicitly
{
  const result = Button({ label: "Enabled", disabled: false });
  assert.equal(result.disabled, false, "Button should respect disabled=false");
}

// Test 6: Button returns all expected fields
{
  const result = Button({ label: "Full" });
  assert.ok("type" in result, "Result should have 'type' field");
  assert.ok("label" in result, "Result should have 'label' field");
  assert.ok("disabled" in result, "Result should have 'disabled' field");
  assert.equal(Object.keys(result).length, 3, "Result should have exactly 3 fields");
}

// Test 7: ButtonProps type accepts minimal input
{
  const props: ButtonProps = { label: "Minimal" };
  const result = Button(props);
  assert.equal(result.label, "Minimal", "Button should work with minimal ButtonProps");
}

// Test 8: ButtonProps type accepts optional disabled
{
  const props: ButtonProps = { label: "With disabled", disabled: true };
  const result = Button(props);
  assert.equal(result.disabled, true, "Button should work with disabled in ButtonProps");
}

// Test 9: Button does not mutate input props
{
  const input = { label: "Immutable", disabled: false };
  const inputCopy = { ...input };
  Button(input);
  assert.deepEqual(input, inputCopy, "Button should not mutate input props");
}

// Test 10: Button label with special characters
{
  const result = Button({ label: "<script>alert('xss')</script> & \"quotes\"" });
  assert.equal(result.label, "<script>alert('xss')</script> & \"quotes\"", "Button should preserve special characters in label");
}

console.log("All 10 Button tests passed!");
