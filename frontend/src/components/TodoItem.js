import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import styles from "./TodoItem.module.css";

// PUBLIC_INTERFACE
export default function TodoItem({ todo, onToggleComplete, onDelete, onUpdateTitle }) {
  /** Single todo row with completion checkbox, inline edit, and delete. */
  const checkboxId = useId();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.title);
  const inputRef = useRef(null);

  useEffect(() => {
    // Keep draft in sync if todo title changes externally.
    setDraft(todo.title);
  }, [todo.title]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const trimmedDraft = useMemo(() => draft.trim(), [draft]);
  const canSave = trimmedDraft.length > 0;

  function startEdit() {
    setIsEditing(true);
    setDraft(todo.title);
  }

  function cancelEdit() {
    setIsEditing(false);
    setDraft(todo.title);
  }

  function saveEdit() {
    if (!canSave) return;
    onUpdateTitle(trimmedDraft);
    setIsEditing(false);
  }

  function onEditKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      saveEdit();
    } else if (e.key === "Escape") {
      e.preventDefault();
      cancelEdit();
    }
  }

  return (
    <div
      className={`${styles.card} ${todo.completed ? styles.completed : ""}`}
    >
      <div className={styles.left}>
        <input
          id={checkboxId}
          className={styles.checkbox}
          type="checkbox"
          checked={todo.completed}
          onChange={onToggleComplete}
        />
      </div>

      <div className={styles.main}>
        {!isEditing ? (
          <label className={styles.title} htmlFor={checkboxId}>
            {todo.title}
          </label>
        ) : (
          <div className={styles.editWrap}>
            <label className={styles.srOnly} htmlFor={`${checkboxId}-edit`}>
              Edit task title
            </label>
            <input
              id={`${checkboxId}-edit`}
              ref={inputRef}
              className={styles.editInput}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={onEditKeyDown}
            />
            <div className={styles.editHint} aria-live="polite">
              Enter to save · Esc to cancel
            </div>
          </div>
        )}
      </div>

      <div className={styles.actions}>
        {!isEditing ? (
          <button
            type="button"
            className={styles.editBtn}
            onClick={startEdit}
          >
            Edit
          </button>
        ) : (
          <button
            type="button"
            className={styles.saveBtn}
            onClick={saveEdit}
            disabled={!canSave}
          >
            Save
          </button>
        )}

        <button
          type="button"
          className={styles.deleteBtn}
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
