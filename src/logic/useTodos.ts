import { useAtom, useSetAtom, useAtomValue } from "jotai";
import { useCallback } from "react";
import {
  filterAtom,
  filteredTodoIdsAtom,
  todoStatsAtom,
  addTodoAtom,
  deleteTodoAtom,
  updateTodoAtom,
  toggleTodoAtom,
  clearCompletedAtom,
  toggleAllTodosAtom,
  todoAtomFamily,
} from "@/state/state";
import type { Todo } from "@/type/todo";

export const useTodos = () => {
  const [filter, setFilter] = useAtom(filterAtom);
  const filteredIds = useAtomValue(filteredTodoIdsAtom);
  const stats = useAtomValue(todoStatsAtom);

  const addTodoAction = useSetAtom(addTodoAtom);
  const deleteTodoAction = useSetAtom(deleteTodoAtom);
  const updateTodoAction = useSetAtom(updateTodoAtom);
  const toggleTodoAction = useSetAtom(toggleTodoAtom);
  const clearCompletedAction = useSetAtom(clearCompletedAtom);
  const toggleAllAction = useSetAtom(toggleAllTodosAtom);

  const addTodo = useCallback(
    (text: string) => {
      addTodoAction(text);
    },
    [addTodoAction],
  );

  const toggleTodo = useCallback(
    (id: string) => {
      toggleTodoAction(id);
    },
    [toggleTodoAction],
  );

  const deleteTodo = useCallback(
    (id: string) => {
      deleteTodoAction(id);
    },
    [deleteTodoAction],
  );

  const updateTodo = useCallback(
    (id: string, text: string) => {
      updateTodoAction({ id, updates: { text: text.trim() } });
    },
    [updateTodoAction],
  );

  const clearCompleted = useCallback(() => {
    clearCompletedAction();
  }, [clearCompletedAction]);

  const toggleAll = useCallback(() => {
    toggleAllAction();
  }, [toggleAllAction]);

  return {
    filteredIds, // IDのリストを返す
    filter,
    stats,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    clearCompleted,
    toggleAll,
    setFilter,
  };
};

// 個別のTodoアイテム用のフック
export const useTodoItem = (id: string) => {
  const [todo, setTodo] = useAtom(todoAtomFamily(id));

  const updateTodo = useCallback(
    (updates: Partial<Todo>) => {
      if (todo) {
        setTodo({ ...todo, ...updates });
      }
    },
    [todo, setTodo],
  );

  return { todo, updateTodo };
};
