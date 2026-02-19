const Task = require('../models/task');
const logger = require('../utils/logger');

const taskController = {
  // GET /tasks - List all tasks
  getAllTasks: (req, res) => {
    const tasks = Task.findAll();
    logger.logOperation('LIST_TASKS', { count: tasks.length });
    res.json(tasks);
  },

  // GET /tasks/:id - Get single task
  getTaskById: (req, res) => {
    const id = parseInt(req.params.id, 10);
    
    if (isNaN(id)) {
      logger.warn('Invalid task ID requested', { id: req.params.id });
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    const task = Task.findById(id);
    
    if (!task) {
      logger.warn('Task not found', { taskId: id });
      return res.status(404).json({ error: 'Task not found' });
    }

    logger.logOperation('GET_TASK', { taskId: id });
    res.json(task);
  },

  // POST /tasks - Create a new task
  createTask: (req, res) => {
    const { title, description, priority } = req.body;

    // Validate title
    if (!title || typeof title !== 'string' || title.trim() === '') {
      logger.warn('Task creation failed - invalid title', { title });
      return res.status(400).json({ error: 'Title is required and must be a non-empty string' });
    }

    // Validate priority if provided
    if (priority && !Task.getValidPriorities().includes(priority)) {
      logger.warn('Task creation failed - invalid priority', { priority });
      return res.status(400).json({ 
        error: `Invalid priority. Must be one of: ${Task.getValidPriorities().join(', ')}` 
      });
    }

    const task = Task.create({
      title: title.trim(),
      description: description || '',
      priority
    });

    logger.logOperation('CREATE_TASK', { taskId: task.id, title: task.title });
    res.status(201).json(task);
  },

  // PATCH /tasks/:id - Update a task
  updateTask: (req, res) => {
    const id = parseInt(req.params.id, 10);
    
    if (isNaN(id)) {
      logger.warn('Invalid task ID for update', { id: req.params.id });
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    const { title, description, completed, priority } = req.body;

    // Validate title if provided
    if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
      logger.warn('Task update failed - invalid title', { taskId: id, title });
      return res.status(400).json({ error: 'Title must be a non-empty string' });
    }

    // Validate priority if provided
    if (priority !== undefined && !Task.getValidPriorities().includes(priority)) {
      logger.warn('Task update failed - invalid priority', { taskId: id, priority });
      return res.status(400).json({ 
        error: `Invalid priority. Must be one of: ${Task.getValidPriorities().join(', ')}` 
      });
    }

    // Validate completed if provided
    if (completed !== undefined && typeof completed !== 'boolean') {
      logger.warn('Task update failed - invalid completed value', { taskId: id, completed });
      return res.status(400).json({ error: 'Completed must be a boolean' });
    }

    const task = Task.update(id, {
      title: title ? title.trim() : undefined,
      description,
      completed,
      priority
    });

    if (!task) {
      logger.warn('Task not found for update', { taskId: id });
      return res.status(404).json({ error: 'Task not found' });
    }

    logger.logOperation('UPDATE_TASK', { taskId: id, updates: Object.keys(req.body) });
    res.json(task);
  },

  // DELETE /tasks/:id - Delete a task
  deleteTask: (req, res) => {
    const id = parseInt(req.params.id, 10);
    
    if (isNaN(id)) {
      logger.warn('Invalid task ID for deletion', { id: req.params.id });
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    const deleted = Task.delete(id);

    if (!deleted) {
      logger.warn('Task not found for deletion', { taskId: id });
      return res.status(404).json({ error: 'Task not found' });
    }

    logger.logOperation('DELETE_TASK', { taskId: id });
    res.status(204).send();
  }
};

module.exports = taskController;
