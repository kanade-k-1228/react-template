import { Inbox } from "lucide-react";
import { TodoItemWrapper } from "./TodoItem";

interface TodoListProps {
  todoIds: string[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
}

export const TodoList = ({
  todoIds,
  onToggle,
  onDelete,
  onUpdate,
}: TodoListProps) => {
  if (todoIds.length === 0) {
    return (
      <div
        className="rounded-lg p-8 text-center border border-gray-800"
        style={{
          backgroundColor: "rgba(17, 24, 39, 0.3)",
        }}
      >
        <div className="flex flex-col items-center gap-3">
          <Inbox size={48} className="text-gray-600" />
          <div className="space-y-1">
            <p className="text-base font-medium text-gray-400">
              タスクがありません
            </p>
            <p className="text-sm text-gray-600">
              新しいタスクを追加してください
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {todoIds.map((id) => (
        <div key={id}>
          <TodoItemWrapper
            id={id}
            onToggle={onToggle}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        </div>
      ))}
    </div>
  );
};
