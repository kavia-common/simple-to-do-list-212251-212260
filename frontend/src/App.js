import React, { useMemo } from "react";
import "./App.css";
import Header from "./components/Header";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import Filters from "./components/Filters";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { FILTERS } from "./constants/todo";

/**
 * @typedef {{id: string, title: string, completed: boolean, createdAt: number}} Todo
 */

/**
 * Generate a stable, collision-resistant id without extra dependencies.
 * @returns {string}
 */
function makeId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

// PUBLIC_INTERFACE
function App() {
  /** Retro-themed to-do app with localStorage persistence and filters. */
  const [todos, setTodos] = useLocalStorage(
    "retro_todos_v1",
    /** @returns {Todo[]} */ () => []
  );
  const [filter, setFilter] = useLocalStorage("retro_todos_filter_v1", FILTERS.ALL);

  function addTodo(title) {
    /** Add a new todo item. */
    const next = {
      id: makeId(),
      title,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos((prev) => [next, ...prev]);
  }

  function toggleComplete(id) {
    /** Toggle completion state for a todo. */
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTodo(id) {
    /** Delete a todo by id. */
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function updateTitle(id, title) {
    /** Update the title of a todo. */
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, title } : t)));
  }

  const counts = useMemo(() => {
    const completed = todos.filter((t) => t.completed).length;
    const active = todos.length - completed;
    return { all: todos.length, active, completed };
  }, [todos]);

  const visibleTodos = useMemo(() => {
    if (filter === FILTERS.ACTIVE) return todos.filter((t) => !t.completed);
    if (filter === FILTERS.COMPLETED) return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  return (
    <div className="App">
      <main className="shell">
        <Header />
        <div className="grid">
          <TodoInput onAdd={addTodo} />
          <Filters value={filter} onChange={setFilter} counts={counts} />
          <TodoList
            todos={visibleTodos}
            onToggleComplete={toggleComplete}
            onDelete={deleteTodo}
            onUpdateTitle={updateTitle}
          />
        </div>
        <div className="footerNote">
          Tip: Edit a task inline. Enter saves, Escape cancels.
        </div>
      </main>
    </div>
  );
}

export default App;
