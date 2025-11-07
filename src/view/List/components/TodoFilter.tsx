import { CheckSquare, Clock, ListTodo } from "lucide-react";
import type { TodoFilter as FilterType } from "@/type/todo";

interface TodoFilterProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  stats: {
    total: number;
    active: number;
    completed: number;
  };
}

export const TodoFilter = ({
  filter,
  onFilterChange,
  stats,
}: TodoFilterProps) => {
  const filters: {
    value: FilterType;
    label: string;
    count?: number;
    icon: typeof ListTodo;
    gradient: string;
  }[] = [
    {
      value: "all",
      label: "すべて",
      count: stats.total,
      icon: ListTodo,
      gradient: "from-gray-600 to-gray-700",
    },
    {
      value: "active",
      label: "未完了",
      count: stats.active,
      icon: Clock,
      gradient: "from-yellow-600 to-orange-600",
    },
    {
      value: "completed",
      label: "完了済み",
      count: stats.completed,
      icon: CheckSquare,
      gradient: "from-green-600 to-emerald-600",
    },
  ];

  return (
    <div
      className="rounded-lg p-3 border border-gray-800"
      style={{
        backgroundColor: "rgba(17, 24, 39, 0.3)",
      }}
    >
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex gap-2 flex-1">
          {filters.map((f) => {
            const Icon = f.icon;
            const isActive = filter === f.value;

            return (
              <button
                key={f.value}
                type="button"
                onClick={() => onFilterChange(f.value)}
                className={`
                  flex-1 min-w-[100px]
                  px-3 py-2 rounded-lg
                  transition-colors duration-200
                  border
                  ${
                    isActive
                      ? "bg-gray-700 border-gray-600 text-gray-200"
                      : "hover:bg-gray-800 border-gray-800 hover:border-gray-700 text-gray-400 hover:text-gray-300"
                  }
                `}
              >
                <div className="flex items-center justify-center gap-2">
                  <Icon size={16} />
                  <span className="font-medium text-sm">{f.label}</span>
                  {f.count !== undefined && (
                    <span
                      className={`ml-1 px-1.5 py-0.5 rounded text-xs ${
                        isActive
                          ? "bg-gray-600 text-gray-200"
                          : "bg-gray-800 text-gray-500"
                      }`}
                    >
                      {f.count}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Stats Summary */}
        <div className="flex items-center gap-3 px-3">
          <div className="flex flex-col items-center">
            <span className="text-xl font-semibold text-gray-300">
              {Math.round((stats.completed / Math.max(stats.total, 1)) * 100)}%
            </span>
            <span className="text-xs text-gray-500">完了率</span>
          </div>
        </div>
      </div>
    </div>
  );
};
