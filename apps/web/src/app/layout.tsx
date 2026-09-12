import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "TaskFlow",
  description:
    "Plan tasks, coordinate jobs, and manage proposals from one workspace.",
};

/**
 * Root layout for the TaskFlow web app.
 *
 * Required by Next.js App Router: every page must have a root layout
 * that provides the <html> and <body> elements.
 */
export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
