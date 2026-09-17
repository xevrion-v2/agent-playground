import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TaskFlow",
  description: "Plan tasks, coordinate jobs, and manage proposals.",
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
