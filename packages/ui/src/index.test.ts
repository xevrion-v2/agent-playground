import { Button, type ButtonProps } from "./index";

// ── Basic rendering ──────────────────────────────────────────────

function assert(condition: boolean, message: string): void {
  if (!condition) throw new Error(`FAIL: ${message}`);
}

function assertEqual<T>(actual: T, expected: T, label: string): void {
  if (actual !== expected) {
    throw new Error(`FAIL: ${label} — expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

// ── Test: default label ─────────────────────────────────────────
{
  const btn = Button({ label: "Click me" });
  assert(btn.type === "button", "type should be 'button'");
  assertEqual(btn.label, "Click me", "label should be 'Click me'");
  assertEqual(btn.disabled, false, "disabled should default to false");
}

// ── Test: disabled override ─────────────────────────────────────
{
  const btn = Button({ label: "Submit", disabled: true });
  assertEqual(btn.type, "button", "type should be 'button'");
  assertEqual(btn.label, "Submit", "label should be 'Submit'");
  assertEqual(btn.disabled, true, "disabled should be true");
}

// ── Test: disabled = false explicitly ──────────────────────────
{
  const btn = Button({ label: "Save", disabled: false });
  assertEqual(btn.disabled, false, "disabled should be false when explicitly set");
}

// ── Test: empty label ──────────────────────────────────────────
{
  const btn = Button({ label: "" });
  assertEqual(btn.label, "", "empty label should be allowed");
  assertEqual(btn.disabled, false, "disabled defaults to false");
}

// ── TypeScript type check: ensure props type is exported ──────
{
  const props: ButtonProps = { label: "test", disabled: true };
  const btn = Button(props);
  assertEqual(btn.label, "test", "typed props should work");
}

console.log("✅ All Button UI tests passed");
