import "./Column.css"
import { Task } from "../Task/Task"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"

export const Column = ({ tasks, onDelete }) => {
  return (
    <div className="column">

      <SortableContext
        items={tasks.map(t => t.id)}
        strategy={verticalListSortingStrategy}
      >
        {tasks.map(task => (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            onDelete={onDelete}
          />
        ))}
      </SortableContext>

    </div>
  )
}