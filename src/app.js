const express = require('express');
const taskRoutes = require('./routes/tasks');
const errorHandler = require('./middleware/errorHandler');
const requestLogger = require('./middleware/requestLogger');
const logger = require('./utils/logger');

const app = express();

// Track server start time for uptime calculation
const startTime = Date.now();

// Middleware
app.use(express.json());
app.use(requestLogger);

// Routes
app.use('/tasks', taskRoutes);

// Health check endpoint with monitoring details
app.get('/health', (req, res) => {
  const uptime = Math.floor((Date.now() - startTime) / 1000);
  const memoryUsage = process.memoryUsage();
  
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: `${uptime} seconds`,
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    memory: {
      heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`,
      heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`
    }
  });
});

// 404 handler
app.use((req, res) => {
  logger.warn('Route not found', { method: req.method, path: req.path });
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use(errorHandler);

module.exports = app;
