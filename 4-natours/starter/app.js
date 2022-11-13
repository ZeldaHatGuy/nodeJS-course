//Imports
const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();
const swaggerUi = require('swagger-ui-express');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// const swaggerDocument = require('./swagger.json');

//Middleware
// app.use(require('express-status-monitor')());

app.use(express.json());
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.static(`${__dirname}/public`));

// Mount our routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
