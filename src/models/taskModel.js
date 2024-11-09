let tasks = []; 
let currentId = 1; 

function createTask(taskData) {
  const newTask = {
    id: currentId++,
    userId: taskData.userId, 
    title: taskData.title,
    description: taskData.description || '',
    dueDate: new Date(taskData.dueDate),
    status: taskData.status,
    createdAt: new Date(),
  };
  tasks.push(newTask);
  return newTask;
}

function getAllTasks(userId, { status, dueDate, page = 1, limit = 10 }) {
  let filteredTasks = tasks.filter(task => task.userId === userId);

  if (status) filteredTasks = filteredTasks.filter(task => task.status === status);
  if (dueDate) {
    const due = new Date(dueDate);
    if (!isNaN(due)) {
      filteredTasks = filteredTasks.filter(
        task => new Date(task.dueDate).toDateString() === due.toDateString()
      );
    }
  }

  const startIndex = (page - 1) * limit;
  const paginatedTasks = filteredTasks.slice(startIndex, startIndex + parseInt(limit));
  return { tasks: paginatedTasks, total: filteredTasks.length };
}

function getTaskById(userId, id) {
  return tasks.find(task => task.id === id && task.userId === userId) || null;
}

function updateTask(userId, id, taskData) {
  const task = tasks.find(task => task.id === id && task.userId === userId);
  if (!task) return null;

  if (taskData.title) task.title = taskData.title;
  if (taskData.description !== undefined) task.description = taskData.description;
  if (taskData.dueDate) task.dueDate = new Date(taskData.dueDate);
  if (taskData.status) task.status = taskData.status;

  return task;
}

function deleteTask(userId, id) {
  const taskIndex = tasks.findIndex(task => task.id === id && task.userId === userId);
  if (taskIndex === -1) return false;

  tasks.splice(taskIndex, 1);
  return true;
}

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
