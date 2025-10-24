import { useState } from "react";
import { Plus } from "lucide-react";

interface TodoInputProps {
  onAdd: (text: string) => void;
}

export const TodoInput = ({ onAdd }: TodoInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAdd(inputValue);
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={`relative rounded-lg p-2 border ${
          isFocused ? "border-gray-600" : "border-gray-800"
        } transition-colors duration-200`}
        style={{
          backgroundColor: "rgba(17, 24, 39, 0.3)",
        }}
      >
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="新しいタスクを入力..."
              className="
                w-full px-4 py-3 pr-10
                bg-transparent
                border-none outline-none
                text-gray-200 placeholder-gray-600
                text-base
              "
            />
          </div>

          <button
            type="submit"
            disabled={!inputValue.trim()}
            className={`
              px-4 py-2.5 rounded-lg
              font-medium
              transition-colors duration-200
              flex items-center gap-2
              ${
                inputValue.trim()
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                  : "bg-gray-800 cursor-not-allowed opacity-50 text-gray-500"
              }
            `}
          >
            <Plus size={18} />
            <span className="hidden sm:inline">追加</span>
          </button>
        </div>
      </div>
    </form>
  );
};
