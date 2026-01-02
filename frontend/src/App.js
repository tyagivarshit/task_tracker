import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [createdTask, setCreatedTask] = useState(null);

  const handleTaskCreated = (task) => {
    setCreatedTask(task);
  };

  return (
    <div className="app-root">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1 className="logo">
            Task <span>Tracker</span>
          </h1>
          <p className="logo-subtitle">Plan your day like a pro.</p>
        </div>

        <nav className="sidebar-nav">
          <button className="nav-item nav-item-active">
            <span>Today</span>
            <span className="pill pill-focus">Focus</span>
          </button>
          <button className="nav-item">Upcoming</button>
          <button className="nav-item">Completed</button>
        </nav>

        <div className="sidebar-footer">
          <p>Built with MERN</p>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <h2 className="topbar-title">Today&apos;s Overview</h2>
            <p className="topbar-subtitle">
              Create, prioritize and track your daily tasks.
            </p>
          </div>
          <div className="topbar-status">
            <span className="status-dot" />
            <span>Backend status: Connected</span>
          </div>
        </header>

        <div className="cards-grid">
          <section className="card">
            <div className="card-header">
              <h3>Add Task</h3>
              <span className="card-tag">New · Today</span>
            </div>
            <TaskForm onTaskCreated={handleTaskCreated} />
          </section>

          <section className="card">
            <div className="card-header">
              <h3>Tasks</h3>
            </div>
            <TaskList newTask={createdTask} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
