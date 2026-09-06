import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TaskFlow - Task Planning and Proposal Management",
  description:
    "TaskFlow helps teams plan tasks, coordinate jobs, and manage proposals from one workspace.",
};

export default function HomePage() {
  return (
    <main>
      <h1>TaskFlow</h1>
      <p>Plan tasks, coordinate jobs, and manage proposals from one workspace.</p>
    </main>
  );
}
