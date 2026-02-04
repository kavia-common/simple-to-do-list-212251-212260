import React from "react";
import TodoItem from "./TodoItem";
import styles from "./TodoList.module.css";

// PUBLIC_INTERFACE
export default function TodoList({
  todos,
  onToggleComplete,
  onDelete,
  onUpdateTitle,
}) {
  /** Vertical list of todo items. */
  if (todos.length === 0) {
    return (
      <div className={styles.empty} role="status" aria-live="polite">
        No tasks here yet. Add one above.
      </div>
    );
  }

  return (
    <ul className={styles.list} aria-label="To-do items">
      {todos.map((t) => (
        <li key={t.id} className={styles.item}>
          <TodoItem
            todo={t}
            onToggleComplete={() => onToggleComplete(t.id)}
            onDelete={() => onDelete(t.id)}
            onUpdateTitle={(newTitle) => onUpdateTitle(t.id, newTitle)}
          />
        </li>
      ))}
    </ul>
  );
}
