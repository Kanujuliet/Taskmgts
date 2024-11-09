const express = require('express');
const taskController = require('../controllers/taskController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/tasks', authenticateToken, taskController.createTask);
router.put('/tasks/:id', authenticateToken, taskController.updateTask);
router.delete('/tasks/:id', authenticateToken, taskController.deleteTask);
router.get('/tasks', authenticateToken, taskController.getAllTasks);
router.get('/tasks/:id', authenticateToken, taskController.getTaskById);

module.exports = router;
