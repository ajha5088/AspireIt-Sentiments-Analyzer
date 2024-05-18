// Error handling middleware function
function errorMiddleware(err, req, res, next) {
  // Log the error for debugging
  console.error(err);

  // Set the status code based on the type of error
  const statusCode = err.statusCode || 500;

  // Send an error response to the client
  res.status(statusCode).json({ error: err.message });
}

// Register the error handling middleware
module.exports = errorMiddleware
