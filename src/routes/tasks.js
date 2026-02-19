const express = require('express');
const taskController = require('../controllers/taskController');

const router = express.Router();

// GET /tasks - List all tasks
router.get('/', taskController.getAllTasks);

// GET /tasks/:id - Get single task by ID
router.get('/:id', taskController.getTaskById);

// POST /tasks - Create a new task
router.post('/', taskController.createTask);

// PATCH /tasks/:id - Update a task
router.patch('/:id', taskController.updateTask);

// DELETE /tasks/:id - Delete a task
router.delete('/:id', taskController.deleteTask);

module.exports = router;
