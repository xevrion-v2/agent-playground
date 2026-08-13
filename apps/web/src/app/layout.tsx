import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TaskFlow",
  description: "Task management system powered by AI agents",
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
