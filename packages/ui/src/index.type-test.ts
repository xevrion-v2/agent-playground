import { Button, type ButtonProps, type ButtonResult } from "./index";

const props: ButtonProps = { label: "Save", disabled: true };
const result: ButtonResult = Button(props);

const typeValue: "button" = result.type;
const disabledValue: boolean = result.disabled;

// @ts-expect-error label is required
Button({});

// @ts-expect-error disabled must be boolean when provided
Button({ label: "Save", disabled: "yes" });

// @ts-expect-error unknown props are rejected by the shared Button stub
Button({ label: "Save", onClick: () => undefined });

// @ts-expect-error ButtonResult.type is the literal "button"
const invalidType: "submit" = result.type;

void typeValue;
void disabledValue;
void invalidType;
