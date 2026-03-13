// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);

  // Default error response
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Handle specific error types
  if (err.message.includes('Unsupported currency code')) {
    statusCode = 400;
  } else if (err.message.includes('Failed to fetch')) {
    statusCode = 503;
    message = 'External API service unavailable';
  } else if (err.message.includes('API Error')) {
    statusCode = 502;
    message = 'Exchange Rate API Error';
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export default errorHandler;
