import { useEffect, useState } from 'react';
import API from './api';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await API.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    
    <div>
      <h1>Task Manager</h1>
      
      <button onClick={() => setFilter('all')}>All</button>
      <button onClick={() => setFilter('completed')}>Completed</button>
      <button onClick={() => setFilter('pending')}>Pending</button>
      
      <TaskForm fetchTasks={fetchTasks} />
      {loading ? <p>Loading...</p> : <TaskList tasks={filteredTasks} fetchTasks={fetchTasks} />}
      
    </div>
  );
}

export default App;