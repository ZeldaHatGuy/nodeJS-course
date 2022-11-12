
//Imports
const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const app = express();
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

//Middleware
app.use(express.json());
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

app.use(morgan('dev'));

// Mount our routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);


//Start server on port 3000
const port = 3000;
app.listen( port, () => {
    console.log(`App running on port ${port}`);
});




