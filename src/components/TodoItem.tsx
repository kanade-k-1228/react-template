import { Check, CheckCircle2, Circle, Edit2, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useTodoItem } from "@/logic/useTodos";
import type { Todo } from "@/type/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
}

export const TodoItem = ({
  todo,
  onToggle,
  onDelete,
  onUpdate,
}: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [isHovered, setIsHovered] = useState(false);

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(todo.id, editText);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div
        className="rounded-lg p-3 border border-gray-800"
        style={{
          backgroundColor: "rgba(17, 24, 39, 0.3)",
        }}
      >
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") handleCancel();
            }}
            className="
              flex-1 px-3 py-2
              bg-gray-900/50 rounded-lg
              border border-gray-700
              outline-none focus:ring-2 focus:ring-purple-500
              text-gray-200
              transition-all duration-200
            "
          />
          <button
            type="button"
            onClick={handleSave}
            className="p-2 rounded bg-gray-700 hover:bg-gray-600 text-gray-200 transition-colors duration-200"
            aria-label="Save"
          >
            <Check size={16} />
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="p-2 rounded bg-gray-800 hover:bg-gray-700 text-gray-400 transition-colors duration-200"
            aria-label="Cancel"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`group rounded-lg border border-gray-800 ${
        todo.completed ? "opacity-60" : ""
      } hover:border-gray-700 transition-colors duration-200`}
      style={{
        backgroundColor: "rgba(17, 24, 39, 0.3)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-4">
        <div className="flex items-center gap-3">
          {/* Custom Checkbox */}
          <button
            type="button"
            onClick={() => onToggle(todo.id)}
            className="relative w-6 h-6 flex-shrink-0"
            aria-label={`Mark ${todo.text} as ${todo.completed ? "incomplete" : "complete"}`}
          >
            {todo.completed ? (
              <CheckCircle2 size={22} className="text-gray-500" />
            ) : (
              <Circle
                size={22}
                className={`${isHovered ? "text-gray-400" : "text-gray-600"} transition-colors duration-200`}
              />
            )}
          </button>

          {/* Todo Text */}
          <span
            className={`
              flex-1 text-base
              transition-all duration-300
              ${todo.completed ? "line-through text-gray-600" : "text-gray-200"}
            `}
          >
            {todo.text}
          </span>

          {/* Action Buttons */}
          <div
            className={`
            flex gap-2
            transition-all duration-300
            ${isHovered ? "opacity-100" : "opacity-0"}
          `}
          >
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="p-1.5 rounded text-gray-500 hover:text-gray-300 hover:bg-gray-800 transition-colors duration-200"
              aria-label="Edit"
            >
              <Edit2 size={16} />
            </button>
            <button
              type="button"
              onClick={() => onDelete(todo.id)}
              className="p-1.5 rounded text-gray-500 hover:text-red-400 hover:bg-gray-800 transition-colors duration-200"
              aria-label="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// atomFamily を使用するラッパーコンポーネント
interface TodoItemWrapperProps {
  id: string;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
}

export const TodoItemWrapper = ({
  id,
  onToggle,
  onDelete,
  onUpdate,
}: TodoItemWrapperProps) => {
  const { todo } = useTodoItem(id);

  if (!todo) {
    return null;
  }

  return (
    <TodoItem
      todo={todo}
      onToggle={onToggle}
      onDelete={onDelete}
      onUpdate={onUpdate}
    />
  );
};
