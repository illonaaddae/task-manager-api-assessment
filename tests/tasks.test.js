const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/task');

describe('Task API', () => {
  // Reset tasks before each test
  beforeEach(() => {
    Task.reset();
  });

  // ==========================================
  // US-1: Create a Task (POST /tasks)
  // ==========================================
  describe('POST /tasks', () => {
    it('should create a task with title and description', async () => {
      const response = await request(app)
        .post('/tasks')
        .send({ title: 'Test Task', description: 'Test Description' });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe('Test Task');
      expect(response.body.description).toBe('Test Description');
      expect(response.body.completed).toBe(false);
      expect(response.body.priority).toBe('medium');
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('updatedAt');
    });

    it('should create a task with only title (description optional)', async () => {
      const response = await request(app)
        .post('/tasks')
        .send({ title: 'Task Without Description' });

      expect(response.status).toBe(201);
      expect(response.body.title).toBe('Task Without Description');
      expect(response.body.description).toBe('');
    });

    it('should create a task with custom priority', async () => {
      const response = await request(app)
        .post('/tasks')
        .send({ title: 'High Priority Task', priority: 'high' });

      expect(response.status).toBe(201);
      expect(response.body.priority).toBe('high');
    });

    it('should return 400 if title is missing', async () => {
      const response = await request(app)
        .post('/tasks')
        .send({ description: 'No title provided' });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 if title is empty string', async () => {
      const response = await request(app)
        .post('/tasks')
        .send({ title: '   ' });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 for invalid priority', async () => {
      const response = await request(app)
        .post('/tasks')
        .send({ title: 'Task', priority: 'invalid' });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('Invalid priority');
    });
  });

  // ==========================================
  // US-2: List All Tasks (GET /tasks)
  // ==========================================
  describe('GET /tasks', () => {
    it('should return empty array when no tasks exist', async () => {
      const response = await request(app).get('/tasks');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('should return all tasks', async () => {
      // Create some tasks first
      await request(app).post('/tasks').send({ title: 'Task 1' });
      await request(app).post('/tasks').send({ title: 'Task 2' });
      await request(app).post('/tasks').send({ title: 'Task 3' });

      const response = await request(app).get('/tasks');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(3);
      expect(response.body[0].title).toBe('Task 1');
      expect(response.body[1].title).toBe('Task 2');
      expect(response.body[2].title).toBe('Task 3');
    });

    it('should return tasks with all required fields', async () => {
      await request(app).post('/tasks').send({ title: 'Complete Task' });

      const response = await request(app).get('/tasks');

      expect(response.status).toBe(200);
      const task = response.body[0];
      expect(task).toHaveProperty('id');
      expect(task).toHaveProperty('title');
      expect(task).toHaveProperty('description');
      expect(task).toHaveProperty('completed');
      expect(task).toHaveProperty('priority');
      expect(task).toHaveProperty('createdAt');
      expect(task).toHaveProperty('updatedAt');
    });
  });

  // ==========================================
  // US-3: View Single Task (GET /tasks/:id)
  // ==========================================
  describe('GET /tasks/:id', () => {
    it('should return a task by ID', async () => {
      const createResponse = await request(app)
        .post('/tasks')
        .send({ title: 'Find Me', description: 'I can be found' });

      const taskId = createResponse.body.id;

      const response = await request(app).get(`/tasks/${taskId}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(taskId);
      expect(response.body.title).toBe('Find Me');
      expect(response.body.description).toBe('I can be found');
    });

    it('should return 404 for non-existent task', async () => {
      const response = await request(app).get('/tasks/999');

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Task not found');
    });

    it('should return 400 for invalid task ID', async () => {
      const response = await request(app).get('/tasks/invalid');

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Invalid task ID');
    });
  });

  // ==========================================
  // US-4: Update a Task (PATCH /tasks/:id)
  // ==========================================
  describe('PATCH /tasks/:id', () => {
    it('should update task title', async () => {
      const createResponse = await request(app)
        .post('/tasks')
        .send({ title: 'Original Title' });

      const taskId = createResponse.body.id;

      const response = await request(app)
        .patch(`/tasks/${taskId}`)
        .send({ title: 'Updated Title' });

      expect(response.status).toBe(200);
      expect(response.body.title).toBe('Updated Title');
    });

    it('should mark task as completed', async () => {
      const createResponse = await request(app)
        .post('/tasks')
        .send({ title: 'Complete Me' });

      const taskId = createResponse.body.id;

      const response = await request(app)
        .patch(`/tasks/${taskId}`)
        .send({ completed: true });

      expect(response.status).toBe(200);
      expect(response.body.completed).toBe(true);
    });

    it('should update task priority', async () => {
      const createResponse = await request(app)
        .post('/tasks')
        .send({ title: 'Priority Task' });

      const taskId = createResponse.body.id;

      const response = await request(app)
        .patch(`/tasks/${taskId}`)
        .send({ priority: 'high' });

      expect(response.status).toBe(200);
      expect(response.body.priority).toBe('high');
    });

    it('should return 404 for non-existent task', async () => {
      const response = await request(app)
        .patch('/tasks/999')
        .send({ title: 'Updated' });

      expect(response.status).toBe(404);
    });

    it('should return 400 for invalid priority', async () => {
      const createResponse = await request(app)
        .post('/tasks')
        .send({ title: 'Task' });

      const response = await request(app)
        .patch(`/tasks/${createResponse.body.id}`)
        .send({ priority: 'invalid' });

      expect(response.status).toBe(400);
    });
  });

  // ==========================================
  // US-5: Delete a Task (DELETE /tasks/:id)
  // ==========================================
  describe('DELETE /tasks/:id', () => {
    it('should delete a task', async () => {
      const createResponse = await request(app)
        .post('/tasks')
        .send({ title: 'Delete Me' });

      const taskId = createResponse.body.id;

      const deleteResponse = await request(app).delete(`/tasks/${taskId}`);
      expect(deleteResponse.status).toBe(204);

      // Verify task is gone
      const getResponse = await request(app).get(`/tasks/${taskId}`);
      expect(getResponse.status).toBe(404);
    });

    it('should return 404 for non-existent task', async () => {
      const response = await request(app).delete('/tasks/999');

      expect(response.status).toBe(404);
    });

    it('should return 400 for invalid task ID', async () => {
      const response = await request(app).delete('/tasks/invalid');

      expect(response.status).toBe(400);
    });
  });

  // ==========================================
  // Health Check Endpoint
  // ==========================================
  describe('GET /health', () => {
    it('should return healthy status', async () => {
      const response = await request(app).get('/health');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('healthy');
      expect(response.body).toHaveProperty('timestamp');
    });
  });
});
