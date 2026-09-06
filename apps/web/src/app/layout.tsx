import type { ReactNode } from "react";

export const metadata = {
  title: "TaskFlow",
  description: "Plan tasks, coordinate jobs, and manage proposals."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
