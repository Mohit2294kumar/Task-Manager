const { v4: uuidv4 } = require('uuid');
const { getTasks, saveTasks } = require('../models/taskModel');

exports.getAllTasks = (req, res) => {
  const tasks = getTasks();
  res.json(tasks);
};

exports.createTask = (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const tasks = getTasks();

  const newTask = {
    id: uuidv4(),
    title,
    completed: false,
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);
  saveTasks(tasks);

  res.status(201).json(newTask);
};

exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const tasks = getTasks();
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;

  saveTasks(tasks);

  res.json(task);
};

exports.deleteTask = (req, res) => {
  const { id } = req.params;
  let tasks = getTasks();

  const newTasks = tasks.filter(t => t.id !== id);

  if (tasks.length === newTasks.length) {
    return res.status(404).json({ error: 'Task not found' });
  }

  saveTasks(newTasks);

  res.json({ message: 'Task deleted' });
};