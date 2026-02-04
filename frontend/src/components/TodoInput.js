import React, { useId, useMemo, useState } from "react";
import styles from "./TodoInput.module.css";

// PUBLIC_INTERFACE
export default function TodoInput({ onAdd }) {
  /** Input row to add new tasks. */
  const [text, setText] = useState("");
  const inputId = useId();

  const trimmed = useMemo(() => text.trim(), [text]);
  const canAdd = trimmed.length > 0;

  function submit() {
    if (!canAdd) return;
    onAdd(trimmed);
    setText("");
  }

  function onKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    }
  }

  return (
    <div className={styles.card}>
      <label className={styles.label} htmlFor={inputId}>
        New task
      </label>
      <div className={styles.row}>
        <input
          id={inputId}
          className={styles.input}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Type something to conquer..."
          aria-describedby={`${inputId}-hint`}
        />
        <button
          type="button"
          className={styles.addButton}
          onClick={submit}
          disabled={!canAdd}
        >
          Add
        </button>
      </div>
      <div id={`${inputId}-hint`} className={styles.hint}>
        Press Enter to add.
      </div>
    </div>
  );
}
