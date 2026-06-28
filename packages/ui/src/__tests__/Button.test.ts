import { describe,it,expect } from "vitest";
import React from "react";
import { Button } from "../Button";
describe("Button",()=>{
  it("returns valid React element",()=>expect(React.isValidElement(Button({label:"x"}))).toBe(true));
  it("renders label",()=>expect((Button({label:"OK"}) as any).props.children).toBe("OK"));
  it("disabled prop passes through",()=>expect((Button({label:"x",disabled:true}) as any).props.disabled).toBe(true));
  it("defaults type=button",()=>expect((Button({label:"x"}) as any).props.type).toBe("button"));
});
