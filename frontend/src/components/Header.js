import React from "react";
import styles from "./Header.module.css";

// PUBLIC_INTERFACE
export default function Header() {
  /** Application header with retro-styled title. */
  return (
    <header className={styles.header}>
      <div className={styles.badge} aria-hidden="true">
        8-BIT
      </div>
      <div className={styles.text}>
        <h1 className={styles.title}>Retro To‑Do</h1>
        <p className={styles.subtitle}>Add. Edit. Check. Repeat.</p>
      </div>
    </header>
  );
}
