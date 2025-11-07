import { clsx } from "clsx";
import { useAtom, useSetAtom } from "jotai";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import {
  deleteTodoAtom,
  todoAtomFamily,
  toggleTodoAtom,
  updateTodoAtom,
} from "@/state/state";

interface TodoCardProps {
  todoId: string;
  draggedTodoId: string | null;
  onDragStart: (e: React.DragEvent, todoId: string) => void;
  showOnly?: "active" | "completed";
}

export const TodoCard = ({
  todoId,
  draggedTodoId,
  onDragStart,
  showOnly,
}: TodoCardProps) => {
  const [todo] = useAtom(todoAtomFamily(todoId));
  const deleteTodo = useSetAtom(deleteTodoAtom);
  const updateTodo = useSetAtom(updateTodoAtom);
  const toggleTodo = useSetAtom(toggleTodoAtom);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  if (!todo) return null;

  // Filter based on showOnly prop
  if (showOnly === "active" && todo.completed) return null;
  if (showOnly === "completed" && !todo.completed) return null;

  const startEdit = () => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = () => {
    if (editingId && editText.trim()) {
      updateTodo({ id: editingId, updates: { text: editText.trim() } });
      setEditingId(null);
      setEditText("");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const handleDeleteTodo = () => {
    deleteTodo(todo.id);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    const dropEffect = e.dataTransfer.dropEffect;
    if (dropEffect === "move") {
      // Toggle the todo's completed status when dropped
      toggleTodo(todo.id);
    }
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, todo.id)}
      onDragEnd={handleDragEnd}
      className={clsx(
        "p-3 rounded-lg border transition-all cursor-move",
        "bg-gray-900/50 border-gray-800 hover:border-gray-700",
        draggedTodoId === todo.id && "opacity-50",
        todo.completed && "opacity-75",
      )}
    >
      {editingId === todo.id ? (
        <div className="space-y-2">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveEdit();
              if (e.key === "Escape") cancelEdit();
            }}
            className="w-full px-2 py-1 bg-gray-800 border border-gray-700 rounded text-gray-200"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={saveEdit}
              className="px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 rounded text-white"
            >
              保存
            </button>
            <button
              type="button"
              onClick={cancelEdit}
              className="px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded text-gray-300"
            >
              キャンセル
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <p
            className={clsx(
              "cursor-text",
              todo.completed ? "text-gray-400 line-through" : "text-gray-200",
            )}
            onDoubleClick={startEdit}
          >
            {todo.text}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              {new Date(todo.createdAt).toLocaleDateString()}
            </span>
            <button
              type="button"
              onClick={handleDeleteTodo}
              className="text-gray-500 hover:text-red-500 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
