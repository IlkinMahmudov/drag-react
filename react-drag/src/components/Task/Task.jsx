import "./Task.css"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

export const Task = ({ id, title, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="task"
    >
      <div className="task-title">
        {title}
      </div>

      <button
        className="delete-btn"
        onClick={() => onDelete(id)}
        onPointerDown={(e) => e.stopPropagation()}
      >
        ✕
      </button>
    </div>
  )
}