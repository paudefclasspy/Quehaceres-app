type Category = "Personal" | "Trabajo" | "Estudio" | "Hogar" | "Salud" | "Compras" | "Proyectos" | "Otros";

export interface Task {
  id: string
  title: string
  completed: boolean
  priority: "low" | "medium" | "high"
  description: string
  category: Category
  labels: string[]
  deadline: Date | null
  subtasks: Task[]
}

