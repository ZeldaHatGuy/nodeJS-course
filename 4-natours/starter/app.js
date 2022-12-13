//Imports
const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// const swaggerDocument = require('./swagger.json');

//Middleware

//Body Parser
app.use(express.static(`${__dirname}/public`));
app.use(express.json({ limit: '10kb' }));

// Data Sanitization against NOSQL attacks

app.use(mongoSanitize());

// Data Sanitization against XSS
app.use(xss());
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'ratingsQuantity',
      'price',
    ],
  })
);

//Custom Middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
//Security Header middleware
app.use(helmet());

//Dev logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//Limit requests
const limiter = rateLimit({
  max: 100,
  windowMS: 60 * 60 * 10000,
  message:
    'Too many requests have been sent from this IP, please try again in 1 hour',
});

app.use('/api', limiter);

// Mount our routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Cant find the specified URL: ${req.originalUrl}`, 404));
});
app.use(globalErrorHandler);
module.exports = app;
