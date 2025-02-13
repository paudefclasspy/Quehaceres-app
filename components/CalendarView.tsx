"use client"

import type { Task } from "@/types/Task"
import { useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

interface CalendarViewProps {
  tasks: Task[]
}

export default function CalendarView({ tasks }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const getDayTasks = (day: number) => {
    return tasks.filter((task) => {
      if (!task.deadline) return false
      const taskDate = new Date(task.deadline)
      return (
        taskDate.getDate() === day &&
        taskDate.getMonth() === currentDate.getMonth() &&
        taskDate.getFullYear() === currentDate.getFullYear()
      )
    })
  }

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  return (
    <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <button onClick={prevMonth} className="p-2">
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <button onClick={nextMonth} className="p-2">
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 p-4">
        {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
          <div key={day} className="text-center font-semibold">
            {day}
          </div>
        ))}
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="h-24 border border-gray-700"></div>
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1
          const dayTasks = getDayTasks(day)
          return (
            <div key={day} className="h-24 border border-gray-700 p-1 overflow-y-auto">
              <div className="text-right">{day}</div>
              {dayTasks.map((task) => (
                <div key={task.id} className="text-xs p-1 mb-1 rounded bg-blue-500 bg-opacity-20" title={task.title}>
                  {task.title.length > 15 ? task.title.substring(0, 15) + "..." : task.title}
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}

