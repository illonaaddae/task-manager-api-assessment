const logger = require('../utils/logger');

/**
 * Request logging middleware
 * Logs all incoming HTTP requests with method, path, and response time
 */
const requestLogger = (req, res, next) => {
  const startTime = Date.now();

  // Log when response finishes
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    
    logger.info('HTTP Request', {
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      userAgent: req.get('User-Agent') || 'Unknown'
    });
  });

  next();
};

module.exports = requestLogger;
