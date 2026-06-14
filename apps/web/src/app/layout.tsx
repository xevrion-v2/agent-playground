import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TaskFlow - AI-Powered Task Management",
  description: "Plan tasks, coordinate jobs, and manage proposals from one workspace.",
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
