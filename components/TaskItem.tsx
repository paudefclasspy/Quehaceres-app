"use client"

import { useState } from "react"
import type { Task } from "@/types/Task"
import { Trash2Icon, EditIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"

interface TaskItemProps {
  task: Task
  deleteTask: (id: string) => void
  editTask: (task: Task) => void
}

export default function TaskItem({ task, deleteTask, editTask }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTask, setEditedTask] = useState(task)
  const [isExpanded, setIsExpanded] = useState(false)

  const handleEdit = () => {
    editTask(editedTask)
    setIsEditing(false)
  }

  const priorityColors = {
    low: "bg-green-400 text-green-800",
    medium: "bg-yellow-400 text-yellow-800",
    high: "bg-red-400 text-red-800",
  }

  return (
    <li className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-4 rounded-lg mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => editTask({ ...task, completed: !task.completed })}
            className="form-checkbox h-5 w-5 text-purple-600"
          />
          {isEditing ? (
            <input
              type="text"
              value={editedTask.title}
              onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
              className="p-1 bg-white bg-opacity-20 rounded"
            />
          ) : (
            <span className={`${task.completed ? "line-through text-gray-400" : "text-white"}`}>{task.title}</span>
          )}
          <span className={`text-xs px-2 py-1 rounded ${priorityColors[task.priority]}`}>
            {task.priority === "low" ? "Baja" : task.priority === "medium" ? "Media" : "Alta"}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <button onClick={handleEdit} className="text-green-500 hover:text-green-600">
              Guardar
            </button>
          ) : (
            <button onClick={() => setIsEditing(true)} className="text-blue-500 hover:text-blue-600">
              <EditIcon className="w-5 h-5" />
            </button>
          )}
          <button onClick={() => deleteTask(task.id)} className="text-red-500 hover:text-red-600">
            <Trash2Icon className="w-5 h-5" />
          </button>
          <button onClick={() => setIsExpanded(!isExpanded)} className="text-gray-500 hover:text-gray-600">
            {isExpanded ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {isExpanded && (
        <div className="mt-4 space-y-2 text-sm text-gray-300">
          <p>{task.description}</p>
          {task.category && (
            <p>
              <strong>Categoría:</strong> {task.category}
            </p>
          )}
          {task.labels.length > 0 && (
            <p>
              <strong>Etiquetas:</strong> {task.labels.join(", ")}
            </p>
          )}
          {task.deadline && (
            <p>
              <strong>Fecha límite:</strong> {task.deadline.toLocaleString()}
            </p>
          )}
        </div>
      )}
    </li>
  )
}

