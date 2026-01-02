import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onTaskCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
    status: 'Pending',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        'http://localhost:5000/api/tasks',
        formData
      );
      onTaskCreated(res.data);
      setFormData({
        title: '',
        description: '',
        priority: 'Medium',
        dueDate: '',
        status: 'Pending',
      });
      setErrors({});
    } catch (err) {
      setErrors({
        server:
          err.response?.data?.message || 'Something went wrong. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-field">
        <label className="form-label">
          Title <span>*</span>
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="form-input"
          placeholder="e.g. Complete MERN assignment"
        />
        {errors.title && <p className="error-text">{errors.title}</p>}
      </div>

      <div className="form-field">
        <label className="form-label">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="form-textarea"
          placeholder="Add some context for future you..."
        />
      </div>

      <div className="form-row">
        <div className="form-field">
          <label className="form-label">Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="form-select"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="form-field">
          <label className="form-label">
            Due Date <span>*</span>
          </label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="form-input"
          />
          {errors.dueDate && <p className="error-text">{errors.dueDate}</p>}
        </div>
      </div>

      <button type="submit" disabled={loading} className="button-primary">
        {loading ? 'Creating…' : 'Create Task'}
      </button>

      {errors.server && <p className="error-text">{errors.server}</p>}
    </form>
  );
};

export default TaskForm;
