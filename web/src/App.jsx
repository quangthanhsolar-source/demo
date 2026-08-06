import { useEffect, useState } from 'react';

const API = '/api/tasks';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function load() {
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setTasks(await res.json());
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function addTask(event) {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: trimmed })
    });
    if (res.ok) {
      const created = await res.json();
      setTasks((prev) => [...prev, created]);
      setTitle('');
    }
  }

  async function toggle(task) {
    const res = await fetch(`${API}/${task.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done: !task.done })
    });
    if (res.ok) {
      const updated = await res.json();
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    }
  }

  async function remove(task) {
    const res = await fetch(`${API}/${task.id}`, { method: 'DELETE' });
    if (res.ok) {
      setTasks((prev) => prev.filter((t) => t.id !== task.id));
    }
  }

  const remaining = tasks.filter((t) => !t.done).length;

  return (
    <div className="app">
      <header className="hero">
        <h1>Task Board</h1>
        <p>A tiny full-stack demo · Express API + React</p>
      </header>

      <main className="card">
        <form className="add-form" onSubmit={addTask}>
          <input
            aria-label="New task title"
            placeholder="Add a new task…"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>

        {error && <p className="error">Error: {error}</p>}
        {loading ? (
          <p className="muted">Loading…</p>
        ) : (
          <>
            <ul className="task-list">
              {tasks.map((task) => (
                <li key={task.id} className={task.done ? 'done' : ''}>
                  <label>
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() => toggle(task)}
                    />
                    <span>{task.title}</span>
                  </label>
                  <button
                    className="delete"
                    aria-label={`Delete ${task.title}`}
                    onClick={() => remove(task)}
                  >
                    ×
                  </button>
                </li>
              ))}
              {tasks.length === 0 && <li className="muted">No tasks yet. Add one above.</li>}
            </ul>
            <footer className="summary">{remaining} remaining</footer>
          </>
        )}
      </main>
    </div>
  );
}
