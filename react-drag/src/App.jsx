import React, { useState } from "react"
import "./App.css"

import {
  DndContext,
  closestCorners,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core"

import {
  arrayMove,
  sortableKeyboardCoordinates
} from "@dnd-kit/sortable"

import { Column } from "./components/Column/Column"
import { Input } from "./components/Input/Input"

function App() {
  const [tasks, setTasks] = useState([
    { id: "1", title: "Add tests to homepage" },
    { id: "2", title: "Fix styling in about section" },
    { id: "3", title: "Learn how to center a div" }
  ])

 
  const addTask = (title) => {
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title }
    ])
  }

  
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter(t => t.id !== id))
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 }
    }),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (!over || active.id === over.id) return

    setTasks((prev) => {
      const oldIndex = prev.findIndex(t => t.id === active.id)
      const newIndex = prev.findIndex(t => t.id === over.id)

      return arrayMove(prev, oldIndex, newIndex)
    })
  }

  return (
    <div className="app">
      <h2 className="title">Task Manager</h2>

      <Input onSubmit={addTask} />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <Column tasks={tasks} onDelete={deleteTask} />
      </DndContext>
    </div>
  )
}

export default App