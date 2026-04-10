import { useState } from 'react';
import API from '../api';

const TaskItem = ({ task, fetchTasks }) => {

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const toggleStatus = async () => {
    await API.patch(`/tasks/${task.id}`);
    fetchTasks();
  };

  const deleteTask = async () => {
    await API.delete(`/tasks/${task.id}`);
    fetchTasks();
  };

  const handleUpdate = async () => {
    await API.patch(`/tasks/${task.id}`, { title: newTitle });
    setIsEditing(false);
    fetchTasks();
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
          <button onClick={handleUpdate}>Save</button>
        </>
      ) : (
        <>
          <span onClick={toggleStatus}>{task.title}</span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={deleteTask}>Delete</button>
        </>
      )}
    </li>
  );
};

export default TaskItem;