const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Handle uncaught exceptions
process.on('unhandledRejection', (err) => {
  shutServer(err, 'unhandledRejection');
});

process.on('uncaughtException', (err) => {
  shutServer(err, 'uncaughtException');
});

const shutServer = (error, errType) => {
  console.log(`an ${errType} occurred: ${error.name}; ${error.message}`);
  console.warn('Shutting down server');
  process.exit();
};
//

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

//Make database connection
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('Database connection established');
  });

//Start server on port 3000'
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
