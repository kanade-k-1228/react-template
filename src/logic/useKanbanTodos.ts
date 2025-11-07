import { useAtomValue, useSetAtom } from "jotai";
import {
  addTodoAtom,
  deleteTodoAtom,
  todoIdsAtom,
  toggleTodoAtom,
  updateTodoAtom,
} from "@/state/state";
import type { Todo } from "@/type/todo";

export const useKanbanTodos = () => {
  const todoIds = useAtomValue(todoIdsAtom);
  const addTodo = useSetAtom(addTodoAtom);
  const deleteTodo = useSetAtom(deleteTodoAtom);
  const updateTodo = useSetAtom(updateTodoAtom);
  const toggleTodo = useSetAtom(toggleTodoAtom);

  // Get all todos with their data
  const _todos: Todo[] = [];
  const todoTasks: Todo[] = [];
  const completedTasks: Todo[] = [];

  // This is a workaround for getting todos from atom family
  // In a real app, you'd have a better way to handle this
  const _getTodoById = (_id: string): Todo | null => {
    // This won't work directly because hooks can't be called conditionally
    // We need a different approach
    return null;
  };

  return {
    todoIds,
    todoTasks,
    completedTasks,
    addTodo,
    deleteTodo,
    updateTodo,
    toggleTodo,
  };
};
