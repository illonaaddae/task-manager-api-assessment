/**
 * Simple structured logger for API operations
 * Provides consistent log format with timestamps
 */

const LOG_LEVELS = {
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
  DEBUG: 'DEBUG'
};

const formatTimestamp = () => {
  return new Date().toISOString();
};

const formatMessage = (level, message, meta = {}) => {
  const logEntry = {
    timestamp: formatTimestamp(),
    level,
    message,
    ...meta
  };
  return JSON.stringify(logEntry);
};

const logger = {
  info: (message, meta) => {
    console.log(formatMessage(LOG_LEVELS.INFO, message, meta));
  },

  warn: (message, meta) => {
    console.warn(formatMessage(LOG_LEVELS.WARN, message, meta));
  },

  error: (message, meta) => {
    console.error(formatMessage(LOG_LEVELS.ERROR, message, meta));
  },

  debug: (message, meta) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(formatMessage(LOG_LEVELS.DEBUG, message, meta));
    }
  },

  // Log API operations specifically
  logOperation: (operation, details) => {
    logger.info(`API Operation: ${operation}`, {
      operation,
      ...details
    });
  }
};

module.exports = logger;
