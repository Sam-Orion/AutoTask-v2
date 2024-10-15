import React, { useState } from 'react';
import axios from 'axios';

function TaskForm() {
  const [task, setTask] = useState({
    name: '',
    priority: 'low',
    dueDate: '',
    time: '',
    outdoor: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/tasks', task);
      alert('Task Created!');
    } catch (error) {
      console.error(error);
      alert('Error creating task');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Task Name" onChange={handleChange} required />
      <input type="date" name="dueDate" onChange={handleChange} required />
      <input type="time" name="time" onChange={handleChange} required />
      <select name="priority" onChange={handleChange}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <label>
        Outdoor Task
        <input type="checkbox" name="outdoor" onChange={handleChange} />
      </label>
      <button type="submit">Create Task</button>
    </form>
  );
}

export default TaskForm;
