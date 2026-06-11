export const metadata = {
  title: "TaskFlow",
  description:
    "Plan tasks, coordinate jobs, and manage proposals from one workspace.",
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
