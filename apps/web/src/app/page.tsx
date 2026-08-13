import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TaskFlow - Task Management Platform",
  description: "Plan tasks, coordinate jobs, and manage proposals from one workspace. TaskFlow is a full-stack task management SaaS for freelancers and clients.",
};

export default function HomePage() {
  return (
    <main>
      <h1>TaskFlow</h1>
      <p>Plan tasks, coordinate jobs, and manage proposals from one workspace.</p>
    </main>
  );
}
