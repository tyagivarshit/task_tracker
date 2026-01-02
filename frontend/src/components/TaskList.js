import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = ({ newTask }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (newTask) {
      setTasks((prev) => [newTask, ...prev]);
    }
  }, [newTask]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        { status }
      );
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? res.data : t))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p className="task-empty">No tasks yet. Create one on the left.</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id} className="task-card">
            <div className="task-main">
              <h3 className="task-title">{task.title}</h3>
              {task.description && (
                <p className="task-desc">{task.description}</p>
              )}
              <div className="task-meta">
                <span
                  className={
                    'badge ' +
                    (task.priority === 'High'
                      ? 'badge-priority-high'
                      : task.priority === 'Medium'
                      ? 'badge-priority-medium'
                      : 'badge-priority-low')
                  }
                >
                  Priority: {task.priority}
                </span>
                <span className="badge badge-status">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="task-actions">
              <select
                value={task.status}
                onChange={(e) =>
                  handleStatusChange(task._id, e.target.value)
                }
                className="status-select"
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
              <button
                onClick={() => handleDelete(task._id)}
                className="button-ghost-danger"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
