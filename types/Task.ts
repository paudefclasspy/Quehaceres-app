export interface Task {
  id: string
  title: string
  completed: boolean
  priority: "low" | "medium" | "high"
  description: string
  category: string
  labels: string[]
  deadline: Date | null
  subtasks: Task[]
}

