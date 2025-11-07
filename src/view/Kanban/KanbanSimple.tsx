import { useAtomValue, useSetAtom } from "jotai";
import { CheckSquare, Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { useTodos } from "@/logic/useTodos";
import { addTodoAtom, todoIdsAtom } from "@/state/state";
import { TodoCard } from "./TodoCard";

export const Kanban = () => {
  const { stats, addTodo: addTodoFunc } = useTodos();
  const todoIds = useAtomValue(todoIdsAtom);
  const _addTodo = useSetAtom(addTodoAtom);
  const [newTodoText, setNewTodoText] = useState("");
  const [draggedTodoId, setDraggedTodoId] = useState<string | null>(null);

  const handleAddTodo = () => {
    if (newTodoText.trim()) {
      addTodoFunc(newTodoText.trim());
      setNewTodoText("");
    }
  };

  const handleDragStart = (e: React.DragEvent, todoId: string) => {
    setDraggedTodoId(todoId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggedTodoId(null);
  };

  return (
    <div className="min-h-screen bg-gray-950 overflow-hidden">
      <div className="relative container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="mb-8 text-center">
          <div className="inline-flex items-center justify-center gap-2 mb-3">
            <CheckSquare className="text-gray-400" size={28} />
            <h1 className="text-3xl font-semibold text-gray-200">
              TODO カンバン
            </h1>
          </div>
          <p className="text-gray-500 text-sm">カンバン表示</p>
        </header>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mb-6">
          <Link
            href="/"
            className="px-4 py-2 rounded-lg text-gray-500 hover:text-gray-300 font-medium transition-colors duration-200 border border-gray-800 hover:border-gray-700"
          >
            リスト
          </Link>
          <Link
            href="/kanban"
            className="px-4 py-2 rounded-lg text-gray-300 bg-gray-800 font-medium transition-colors duration-200"
          >
            カンバン
          </Link>
        </div>

        {/* Add Todo Input */}
        <div className="mb-6 max-w-2xl mx-auto">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
              placeholder="新しいタスクを入力..."
              className="flex-1 px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg text-gray-200 placeholder-gray-500 focus:border-blue-600 focus:outline-none transition-colors"
            />
            <button
              type="button"
              onClick={handleAddTodo}
              disabled={!newTodoText.trim()}
              className="px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-800 disabled:text-gray-500 rounded-lg text-white transition-colors flex items-center gap-2"
            >
              <Plus size={20} />
              追加
            </button>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* TODO Column */}
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-300">未完了</h2>
              <span className="px-2 py-1 bg-gray-800 rounded text-gray-400 text-sm">
                {stats.active}
              </span>
            </div>
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="space-y-3 min-h-[400px] p-4 bg-gray-900/30 rounded-lg border border-gray-800"
            >
              {todoIds.map((todoId) => (
                <TodoCard
                  key={todoId}
                  todoId={todoId}
                  draggedTodoId={draggedTodoId}
                  onDragStart={handleDragStart}
                  showOnly="active"
                />
              ))}
              {stats.active === 0 && (
                <p className="text-center text-gray-600 py-8">
                  タスクがありません
                </p>
              )}
            </div>
          </div>

          {/* Completed Column */}
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-300">完了</h2>
              <span className="px-2 py-1 bg-green-900/50 rounded text-green-400 text-sm">
                {stats.completed}
              </span>
            </div>
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="space-y-3 min-h-[400px] p-4 bg-gray-900/30 rounded-lg border border-gray-800"
            >
              {todoIds.map((todoId) => (
                <TodoCard
                  key={todoId}
                  todoId={todoId}
                  draggedTodoId={draggedTodoId}
                  onDragStart={handleDragStart}
                  showOnly="completed"
                />
              ))}
              {stats.completed === 0 && (
                <p className="text-center text-gray-600 py-8">
                  完了したタスクがありません
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-600 text-sm">
          <p>Made with React + TypeScript + Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
};
