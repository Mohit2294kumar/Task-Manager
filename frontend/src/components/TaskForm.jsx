import { useState } from 'react';
import API from '../api';

const TaskForm = ({ fetchTasks }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    await API.post('/tasks', { title });
    setTitle('');
    fetchTasks();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TaskForm;