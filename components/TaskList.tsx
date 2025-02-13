import type { Task } from "@/types/Task"
import TaskItem from "./TaskItem"

interface TaskListProps {
  tasks: Task[]
  deleteTask: (id: string) => void
  editTask: (task: Task) => void
}

export default function TaskList({ tasks, deleteTask, editTask }: TaskListProps) {
  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} deleteTask={deleteTask} editTask={editTask} />
      ))}
    </ul>
  )
}

