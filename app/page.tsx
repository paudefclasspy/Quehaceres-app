"use client"

import { useState, useEffect } from "react"
import type { Task } from "@/types/Task"
import TaskList from "@/components/TaskList"
import TaskForm from "@/components/TaskForm"
import Header from "@/components/Header"
import CalendarView from "@/components/CalendarView"
import FilterSearch from "@/components/FilterSearch"
import { LayoutGridIcon, ListIcon } from "lucide-react"

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
  const [view, setView] = useState<"list" | "calendar">("list")

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks")
    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks, (key, value) => {
        if (key === "deadline" && value) {
          return new Date(value)
        }
        return value
      })
      setTasks(parsedTasks)
      setFilteredTasks(parsedTasks)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const addTask = (task: Task) => {
    const updatedTasks = [...tasks, task]
    setTasks(updatedTasks)
    setFilteredTasks(updatedTasks)
  }

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id)
    setTasks(updatedTasks)
    setFilteredTasks(updatedTasks)
  }

  const editTask = (editedTask: Task) => {
    const updatedTasks = tasks.map((task) => (task.id === editedTask.id ? editedTask : task))
    setTasks(updatedTasks)
    setFilteredTasks(updatedTasks)
  }

  const toggleView = () => {
    setView(view === "list" ? "calendar" : "list")
  }

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white min-h-screen">
        <div className="bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm min-h-screen">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Aplicación de Tareas</h1>
              <button
                onClick={toggleView}
                className="p-2 rounded bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
              >
                {view === "list" ? <LayoutGridIcon className="w-5 h-5" /> : <ListIcon className="w-5 h-5" />}
              </button>
            </div>
            <TaskForm addTask={addTask} />
            <FilterSearch tasks={tasks} setFilteredTasks={setFilteredTasks} />
            {view === "list" ? (
              <TaskList tasks={filteredTasks} deleteTask={deleteTask} editTask={editTask} />
            ) : (
              <CalendarView tasks={filteredTasks} />
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

