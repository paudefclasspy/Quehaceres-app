"use client"

import { useState } from "react"
import type { Task } from "@/types/Task"

interface FilterSearchProps {
  tasks: Task[]
  setFilteredTasks: (tasks: Task[]) => void
}

export default function FilterSearch({ tasks, setFilteredTasks }: FilterSearchProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [priorityFilter, setPriorityFilter] = useState<"all" | "low" | "medium" | "high">("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [completionFilter, setCompletionFilter] = useState<"all" | "completed" | "active">("all")

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    applyFilters(term, priorityFilter, categoryFilter, completionFilter)
  }

  const handlePriorityFilter = (priority: "all" | "low" | "medium" | "high") => {
    setPriorityFilter(priority)
    applyFilters(searchTerm, priority, categoryFilter, completionFilter)
  }

  const handleCategoryFilter = (category: string) => {
    setCategoryFilter(category)
    applyFilters(searchTerm, priorityFilter, category, completionFilter)
  }

  const handleCompletionFilter = (status: "all" | "completed" | "active") => {
    setCompletionFilter(status)
    applyFilters(searchTerm, priorityFilter, categoryFilter, status)
  }

  const applyFilters = (search: string, priority: string, category: string, completion: string) => {
    let filteredTasks = tasks

    if (search) {
      filteredTasks = filteredTasks.filter(
        (task) =>
          task.title.toLowerCase().includes(search.toLowerCase()) ||
          task.description.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (priority !== "all") {
      filteredTasks = filteredTasks.filter((task) => task.priority === priority)
    }

    if (category !== "all") {
      filteredTasks = filteredTasks.filter((task) => task.category === category)
    }

    if (completion !== "all") {
      filteredTasks = filteredTasks.filter((task) => (completion === "completed" ? task.completed : !task.completed))
    }

    setFilteredTasks(filteredTasks)
  }

  const categories = ["all", ...new Set(tasks.map((task) => task.category))]

  return (
    <div className="mb-4 space-y-2 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg p-4 rounded-lg">
      <input
        type="text"
        placeholder="Buscar tareas..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full p-2 border-2 border-gray-600 rounded-md bg-gray-700 placeholder-gray-400 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 ease-in-out"
      />
      <div className="flex flex-wrap gap-2">
        <select
          value={priorityFilter}
          onChange={(e) => handlePriorityFilter(e.target.value as "all" | "low" | "medium" | "high")}
          className="p-2 border-2 border-gray-600 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 ease-in-out"
        >
          <option value="all">Todas las Prioridades</option>
          <option value="low">Baja</option>
          <option value="medium">Media</option>
          <option value="high">Alta</option>
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => handleCategoryFilter(e.target.value)}
          className="p-2 border-2 border-gray-600 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 ease-in-out"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category === "all" ? "Todas las Categorías" : category}
            </option>
          ))}
        </select>
        <select
          value={completionFilter}
          onChange={(e) => handleCompletionFilter(e.target.value as "all" | "completed" | "active")}
          className="p-2 border-2 border-gray-600 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 ease-in-out"
        >
          <option value="all">Todas las Tareas</option>
          <option value="completed">Completadas</option>
          <option value="active">Activas</option>
        </select>
      </div>
    </div>
  )
}

