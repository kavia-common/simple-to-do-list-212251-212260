import React from "react";
import { FILTER_LABELS, FILTERS } from "../constants/todo";
import styles from "./Filters.module.css";

// PUBLIC_INTERFACE
export default function Filters({ value, onChange, counts }) {
  /** Filter control for All/Active/Completed. */
  return (
    <div className={styles.wrap} aria-label="Task filters" role="group">
      {Object.values(FILTERS).map((filter) => {
        const selected = value === filter;
        const count =
          filter === FILTERS.ALL
            ? counts.all
            : filter === FILTERS.ACTIVE
              ? counts.active
              : counts.completed;

        return (
          <button
            key={filter}
            type="button"
            className={`${styles.btn} ${selected ? styles.selected : ""}`}
            onClick={() => onChange(filter)}
            aria-pressed={selected}
          >
            <span>{FILTER_LABELS[filter]}</span>
            <span className={styles.count} aria-label={`${count} tasks`}>
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
