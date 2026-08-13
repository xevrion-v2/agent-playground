import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TaskFlow | Distributed Task Marketplace",
  description: "TaskFlow is an open-source distributed task marketplace connecting clients with skilled contributors.",
  openGraph: {
    title: "TaskFlow",
    description: "Open-source distributed task marketplace",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
