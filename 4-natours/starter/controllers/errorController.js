const { TokenExpiredError } = require('jsonwebtoken');
const AppError = require('../utils/appError'); // This class allows us to create error objects.

//Support functions for mongoDB errors.
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};
const handleDuplicateFieldsDB = (err) => {
  const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value} . Please use a different value.`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = ` Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};
const handleJsonWebTokenError = () =>
  new AppError('Invalid Token. Please log in again', 401);

const handleTokenExpiredError = () =>
  new AppError('Your token has expired. Please log in again', 401);

/* Control functions for the errors sent to the client based on environment.
We don't want to send the entire stack to outside users in production
But seeing the whole stack is useful for development.
*/
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('ERROR', err);
    res.status(500).json({
      status: 'Failure',
      message: 'An unknown error has occurred',
    });
  }
};

// Actual Error middleware that gets called by our app.
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') sendErrorDev(err, res);
  if (process.env.NODE_ENV === 'production') {
    let error = Object.create(err); // We create a new error object here as to not mutate the original error object.

    // Handle our 3 different types of Mongoose errors
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJsonWebTokenError();
    if (error.name === 'TokenExpiredError') error = handleTokenExpiredError();

    sendErrorProd(error, res);
  }
};
