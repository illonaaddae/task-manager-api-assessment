// In-memory task storage
let tasks = [];
let nextId = 1;

const VALID_PRIORITIES = ['low', 'medium', 'high'];

const Task = {
  // Get all tasks
  findAll: () => {
    return [...tasks];
  },

  // Get task by ID
  findById: (id) => {
    return tasks.find(task => task.id === id) || null;
  },

  // Create a new task
  create: (data) => {
    const task = {
      id: nextId++,
      title: data.title,
      description: data.description || '',
      completed: false,
      priority: VALID_PRIORITIES.includes(data.priority) ? data.priority : 'medium',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    tasks.push(task);
    return task;
  },

  // Update a task
  update: (id, data) => {
    const index = tasks.findIndex(task => task.id === id);
    if (index === -1) return null;

    const task = tasks[index];
    const updated = {
      ...task,
      title: data.title !== undefined ? data.title : task.title,
      description: data.description !== undefined ? data.description : task.description,
      completed: data.completed !== undefined ? data.completed : task.completed,
      priority: data.priority !== undefined && VALID_PRIORITIES.includes(data.priority) 
        ? data.priority 
        : task.priority,
      updatedAt: new Date().toISOString()
    };
    tasks[index] = updated;
    return updated;
  },

  // Delete a task
  delete: (id) => {
    const index = tasks.findIndex(task => task.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
  },

  // Reset tasks (for testing)
  reset: () => {
    tasks = [];
    nextId = 1;
  },

  // Get valid priorities
  getValidPriorities: () => VALID_PRIORITIES
};

module.exports = Task;
