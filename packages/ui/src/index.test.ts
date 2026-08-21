import * as React from "react";
import { Button } from "./index";

// Verify Button returns a React element, not a plain object
const element = Button({ label: "Click me" });

// Check it returns a React element
console.assert(
  React.isValidElement(element),
  "Button should return a valid React element"
);

// Check the element type is 'button'
console.assert(
  element.type === "button",
  `Expected element.type to be "button", got ${String(element.type)}`
);

// Check the label prop is rendered as children
console.assert(
  element.props.children === "Click me",
  `Expected children to be "Click me", got ${String(element.props.children)}`
);

// Check type attribute is "button"
console.assert(
  element.props.type === "button",
  `Expected props.type to be "button", got ${String(element.props.type)}`
);

// Check disabled defaults to false
console.assert(
  element.props.disabled === false,
  `Expected props.disabled to be false, got ${String(element.props.disabled)}`
);

// Check disabled can be overridden
const disabledElement = Button({ label: "Disabled", disabled: true });
console.assert(
  disabledElement.props.disabled === true,
  `Expected disabled prop to be true, got ${String(disabledElement.props.disabled)}`
);

console.log("All Button component tests passed!");
