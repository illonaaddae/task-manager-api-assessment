const Task = require('../models/task');

const taskController = {
  // GET /tasks - List all tasks
  getAllTasks: (req, res) => {
    const tasks = Task.findAll();
    res.json(tasks);
  },

  // GET /tasks/:id - Get single task
  getTaskById: (req, res) => {
    const id = parseInt(req.params.id, 10);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    const task = Task.findById(id);
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  },

  // POST /tasks - Create a new task
  createTask: (req, res) => {
    const { title, description, priority } = req.body;

    // Validate title
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ error: 'Title is required and must be a non-empty string' });
    }

    // Validate priority if provided
    if (priority && !Task.getValidPriorities().includes(priority)) {
      return res.status(400).json({ 
        error: `Invalid priority. Must be one of: ${Task.getValidPriorities().join(', ')}` 
      });
    }

    const task = Task.create({
      title: title.trim(),
      description: description || '',
      priority
    });

    res.status(201).json(task);
  },

  // PATCH /tasks/:id - Update a task
  updateTask: (req, res) => {
    const id = parseInt(req.params.id, 10);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    const { title, description, completed, priority } = req.body;

    // Validate title if provided
    if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
      return res.status(400).json({ error: 'Title must be a non-empty string' });
    }

    // Validate priority if provided
    if (priority !== undefined && !Task.getValidPriorities().includes(priority)) {
      return res.status(400).json({ 
        error: `Invalid priority. Must be one of: ${Task.getValidPriorities().join(', ')}` 
      });
    }

    // Validate completed if provided
    if (completed !== undefined && typeof completed !== 'boolean') {
      return res.status(400).json({ error: 'Completed must be a boolean' });
    }

    const task = Task.update(id, {
      title: title ? title.trim() : undefined,
      description,
      completed,
      priority
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  },

  // DELETE /tasks/:id - Delete a task
  deleteTask: (req, res) => {
    const id = parseInt(req.params.id, 10);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    const deleted = Task.delete(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(204).send();
  }
};

module.exports = taskController;
