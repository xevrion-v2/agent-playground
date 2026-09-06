import type { Metadata } from "next";
import React from "react";
export const metadata: Metadata = { title: "TaskFlow", description: "Task marketplace" };
export default function RootLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (<html lang="en"><body>{children}</body></html>);
}
