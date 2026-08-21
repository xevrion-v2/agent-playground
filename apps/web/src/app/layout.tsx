import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TaskFlow",
  description: "AI Agent Playground - Task Management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
