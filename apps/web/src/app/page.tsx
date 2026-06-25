import type { Metadata } from "next";

/**
 * Homepage metadata for SEO and browser tabs.
 */
export const metadata: Metadata = {
  title: "TaskFlow — Plan tasks, coordinate jobs",
  description:
    "Plan tasks, coordinate jobs, and manage proposals from one workspace."
};

export default function HomePage() {
  return (
    <main>
      <h1>TaskFlow</h1>
      <p>Plan tasks, coordinate jobs, and manage proposals from one workspace.</p>
    </main>
  );
}
