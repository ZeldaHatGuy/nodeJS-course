const fs = require('fs');
const convertID = require('./helpers');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

//Middleware function
exports.checkID = (req, res, next, val) => {
  id = convertID(req.params.id);
  if (!tours.find((el) => el.id === id)) {
    return res.status(404).json({
      status: 'Failure',
      message: `Unable to locate ${req.params.id}`,
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'Failure',
      message: 'You sent a bad request',
    });
  }
  next();
};
//tour handler functions
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'Success',
    requestTime: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  const tour = tours.find((el) => el.id == id);
  res.status(200).json({
    status: 'Success',
    requestTime: req.requestTime,
    data: {
      tour: tour,
    },
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = { id: newId, ...req.body };
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'Success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'Success',
    data: {
      tour: '<updated tour>',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'Success',
    data: null,
  });
};
