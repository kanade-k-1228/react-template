import { Provider } from "jotai";
import { CheckSquare } from "lucide-react";
import { TodoFilter } from "@/components/TodoFilter";
import { TodoInput } from "@/components/TodoInput";
import { TodoList } from "@/components/TodoList";
import { useTodos } from "@/logic/useTodos";

const TodoApp = () => {
  const {
    filteredIds,
    filter,
    stats,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    clearCompleted,
    setFilter,
  } = useTodos();

  return (
    <div className="min-h-screen bg-gray-950 overflow-hidden">
      {/* Main content */}
      <div className="relative container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <header className="mb-8 text-center">
          <div className="inline-flex items-center justify-center gap-2 mb-3">
            <CheckSquare className="text-gray-400" size={28} />
            <h1 className="text-3xl font-semibold text-gray-200">
              TODO アプリ
            </h1>
          </div>
          <p className="text-gray-500 text-sm">Reactのサンプルアプリ</p>
        </header>

        {/* Content */}
        <div className="space-y-6">
          <TodoInput onAdd={addTodo} />

          <TodoFilter
            filter={filter}
            onFilterChange={setFilter}
            stats={stats}
          />

          {/* Todo List with scroll container */}
          <div
            className="max-h-[500px] overflow-y-auto"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <TodoList
              todoIds={filteredIds}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onUpdate={updateTodo}
            />
          </div>

          {/* Footer actions */}
          {stats.completed > 0 && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={clearCompleted}
                className="px-4 py-2 rounded-lg text-gray-500 hover:text-gray-300 font-medium transition-colors duration-200 border border-gray-800 hover:border-gray-700"
                style={{
                  backgroundColor: "rgba(17, 24, 39, 0.5)",
                }}
              >
                完了済みを削除 ({stats.completed})
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-600 text-sm">
          <p>Made with React + TypeScript + Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
};

export const App = () => {
  return (
    <Provider>
      <TodoApp />
    </Provider>
  );
};
