import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TaskFlow - Plan, Coordinate, and Manage Proposals",
  description: "Plan tasks, coordinate jobs, and manage proposals from one workspace. TaskFlow helps teams organize work, track progress, and streamline collaboration.",
};

export default function HomePage() {
  return (
    <main>
      <h1>TaskFlow</h1>
      <p>Plan tasks, coordinate jobs, and manage proposals from one workspace.</p>
    </main>
  );
}
