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
  const todoTasks: Todo[] = [];
  const completedTasks: Todo[] = [];

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
