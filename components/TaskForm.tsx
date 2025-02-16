"use client"

import { useState } from "react"
import type { Task } from "@/types/Task"
import { PlusCircleIcon } from "lucide-react"

const CATEGORIES = [
  "Personal",
  "Trabajo",
  "Estudio",
  "Hogar",
  "Salud",
  "Compras",
  "Proyectos",
  "Otros"
] as const;

type Category = typeof CATEGORIES[number];

interface TaskFormProps {
  addTask: (task: Task) => void
}

export default function TaskForm({ addTask }: TaskFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium")
  const [category, setCategory] = useState<Category>("Personal")
  const [labels, setLabels] = useState<string[]>([])
  const [deadline, setDeadline] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      priority,
      category,
      labels,
      deadline: deadline ? new Date(deadline) : null,
      subtasks: [],
    }
    addTask(newTask)
    resetForm()
  }

  const resetForm = () => {
    setTitle("")
    setDescription("")
    setPriority("medium")
    setCategory("Personal") // Updated to use the default category
    setLabels([])
    setDeadline("")
  }

  const inputClasses =
    "w-full p-3 border-2 border-gray-600 rounded-md bg-gray-700 placeholder-gray-400 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 ease-in-out"

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-semibold mb-4 text-white">Agregar Nueva Tarea</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
            Título
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ingrese el título de la tarea"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
            Descripción
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ingrese la descripción de la tarea"
            className={inputClasses}
            rows={3}
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="priority" className="block text-sm font-medium text-gray-300 mb-1">
              Prioridad
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
              className={inputClasses}
            >
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
              Categoría
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className={inputClasses}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="labels" className="block text-sm font-medium text-gray-300 mb-1">
            Etiquetas
          </label>
          <input
            id="labels"
            type="text"
            value={labels.join(", ")}
            onChange={(e) => setLabels(e.target.value.split(",").map((label) => label.trim()))}
            placeholder="Ingrese etiquetas (separadas por comas)"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="deadline" className="block text-sm font-medium text-gray-300 mb-1">
            Fecha límite
          </label>
          <input
            id="deadline"
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className={inputClasses}
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-6 w-full bg-purple-600 text-white px-4 py-3 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-200 ease-in-out flex items-center justify-center"
      >
        <PlusCircleIcon className="w-5 h-5 mr-2" />
        Agregar Tarea
      </button>
    </form>
  )
}

