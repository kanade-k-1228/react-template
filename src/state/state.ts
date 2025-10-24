import { atom } from "jotai";
import { atomFamily, atomWithStorage } from "jotai/utils";
import type { Todo, TodoFilter } from "@/type/todo";

// TodoのIDリストを管理（LocalStorageに保存）
export const todoIdsAtom = atomWithStorage<string[]>("todoIds", []);

// 個々のTodoアイテムをatomFamilyで管理
export const todoAtomFamily = atomFamily((id: string) =>
  atomWithStorage<Todo | null>(`todo_${id}`, null),
);

// フィルター状態
export const filterAtom = atom<TodoFilter>("all");

// Todoの追加
export const addTodoAtom = atom(null, (get, set, text: string) => {
  const newTodo: Todo = {
    id: crypto.randomUUID(),
    text: text.trim(),
    completed: false,
    createdAt: new Date(),
  };

  // atomFamilyに追加
  set(todoAtomFamily(newTodo.id), newTodo);

  // IDリストに追加
  const currentIds = get(todoIdsAtom);
  set(todoIdsAtom, [...currentIds, newTodo.id]);
});

// Todoの更新
export const updateTodoAtom = atom(
  null,
  (get, set, { id, updates }: { id: string; updates: Partial<Todo> }) => {
    const currentTodo = get(todoAtomFamily(id));
    if (!currentTodo) return;

    const updatedTodo = { ...currentTodo, ...updates };
    set(todoAtomFamily(id), updatedTodo);
  },
);

// Todoの削除
export const deleteTodoAtom = atom(null, (get, set, id: string) => {
  // atomFamilyから削除（nullに設定）
  set(todoAtomFamily(id), null);

  // IDリストから削除
  const currentIds = get(todoIdsAtom);
  set(
    todoIdsAtom,
    currentIds.filter((todoId) => todoId !== id),
  );
});

// Todoの完了状態を切り替え
export const toggleTodoAtom = atom(null, (get, set, id: string) => {
  const todo = get(todoAtomFamily(id));
  if (!todo) return;

  set(todoAtomFamily(id), { ...todo, completed: !todo.completed });
});

// フィルターされたTodoのIDリスト（読み取り専用）
export const filteredTodoIdsAtom = atom((get) => {
  const ids = get(todoIdsAtom);
  const filter = get(filterAtom);

  if (filter === "all") return ids;

  const filteredIds: string[] = [];
  for (const id of ids) {
    const todo = get(todoAtomFamily(id));
    if (todo) {
      if (filter === "completed" && todo.completed) {
        filteredIds.push(id);
      } else if (filter === "active" && !todo.completed) {
        filteredIds.push(id);
      }
    }
  }

  return filteredIds;
});

// 統計情報（読み取り専用）
export const todoStatsAtom = atom((get) => {
  const ids = get(todoIdsAtom);
  let completed = 0;
  let active = 0;

  for (const id of ids) {
    const todo = get(todoAtomFamily(id));
    if (todo) {
      if (todo.completed) {
        completed++;
      } else {
        active++;
      }
    }
  }

  const total = ids.length;

  return { total, completed, active };
});

// 完了済みのTodoを一括削除
export const clearCompletedAtom = atom(null, (get, set) => {
  const ids = get(todoIdsAtom);
  const remainingIds: string[] = [];

  for (const id of ids) {
    const todo = get(todoAtomFamily(id));
    if (todo?.completed) {
      // 完了済みのTodoを削除
      set(todoAtomFamily(id), null);
    } else if (todo && !todo.completed) {
      remainingIds.push(id);
    }
  }

  set(todoIdsAtom, remainingIds);
});

// すべてのTodoの完了状態を切り替え
export const toggleAllTodosAtom = atom(null, (get, set) => {
  const ids = get(todoIdsAtom);
  let allCompleted = true;

  // すべてが完了しているかチェック
  for (const id of ids) {
    const todo = get(todoAtomFamily(id));
    if (todo && !todo.completed) {
      allCompleted = false;
      break;
    }
  }

  // すべてのTodoの完了状態を反転
  for (const id of ids) {
    const todo = get(todoAtomFamily(id));
    if (todo) {
      set(todoAtomFamily(id), { ...todo, completed: !allCompleted });
    }
  }
});
