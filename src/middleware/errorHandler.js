// Global error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);

  // Handle JSON parsing errors
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON' });
  }

  // Default error response
  res.status(500).json({ error: 'Internal server error' });
};

module.exports = errorHandler;
