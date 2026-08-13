import React from "react";
export interface ButtonProps { label:string; disabled?:boolean; variant?:"primary"|"secondary"|"danger"; onClick?:(e:React.MouseEvent<HTMLButtonElement>)=>void; type?:"button"|"submit"|"reset"; }
export function Button({label,disabled=false,variant="primary",onClick,type="button"}:ButtonProps):React.ReactElement{
  return React.createElement("button",{disabled,onClick,type,"data-variant":variant},label);
}
export default Button;
