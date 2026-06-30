type TaskDetailPageProps = {
  params: { taskId: string };
};

export default function TaskDetailPage({ params }: TaskDetailPageProps) {
  return (
    <main>
      <h1>Task Detail</h1>
      <p>View status, assignees, and activity for a single TaskFlow task.</p>
      <p>Task ID: {params.taskId}</p>
    </main>
  );
}
