const TaskModel = require('../models/taskModel');

exports.createTask = (req, res) => {
  const { title, description, dueDate, status } = req.body;
  const userId = req.user.userId;

  const newTask = TaskModel.createTask({ userId, title, description, dueDate, status });
  res.status(201).json(newTask);
};

exports.getAllTasks = (req, res) => {
  const userId = req.user.userId;
  const { status, dueDate, page, limit } = req.query;
  
  const tasks = TaskModel.getAllTasks(userId, { status, dueDate, page, limit });
  res.status(200).json(tasks);
};

exports.getTaskById = (req, res) => {
  const userId = req.user.userId;
  const task = TaskModel.getTaskById(userId, parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.status(200).json(task);
};

exports.updateTask = (req, res) => {
  const userId = req.user.userId;
  const updatedTask = TaskModel.updateTask(userId, parseInt(req.params.id), req.body);
  if (!updatedTask) return res.status(404).json({ error: 'Task not found' });
  res.status(200).json(updatedTask);
};

exports.deleteTask = (req, res) => {
  const userId = req.user.userId;
  const success = TaskModel.deleteTask(userId, parseInt(req.params.id));
  if (!success) return res.status(404).json({ error: 'Task not found' });
  res.status(200).json({ message: 'Task deleted successfully' });
};
