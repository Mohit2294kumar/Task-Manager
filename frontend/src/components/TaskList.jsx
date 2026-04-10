import TaskItem from './TaskItem';

const TaskList = ({ tasks, fetchTasks }) => {
  return (
    <ul>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} fetchTasks={fetchTasks} />
      ))}
    </ul>
  );
};

export default TaskList;