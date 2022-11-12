const fs = require('fs');
const convertID = require('./helpers')

const tours = JSON.parse(
   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);


// validates ID exists in file and returns a boolean
function validateID(id) {
      const tour = tours.find(el => el.id === id);
      if(!tour) {
        return false 
      }
      return true
}

exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: "Success",
        requestTime: req.requestTime,
        results: tours.length,
        data: {
            tours
        }
    })
}

exports.getTour = (req, res) => {
        const id =  convertID(req.params.id)
    if ( !validateID(id)) {
        return res.status(404).json({ 
            message: `no tour with id ${id} has been found`, 
            status: "Failure"
        });
    }
     const tour = tours.find(el => el.id == id)
     res.status(200).json({
        status: 'Success',
        requestTime: req.requestTime,
         data: {
             tour: tour
         }
     });
}

exports.createTour = (req, res) => {
    const newId = tours[tours.length -1].id + 1;
    const newTour = Object.assign({id: newId}, req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: "Success",
            data: {
                tour: newTour
            }
        });
    });
}


exports.updateTour = (req, res) => {
    const id = convertID(req.params.id)
    if (!validateID(id)) {
        return res.status(404).json({
            status: "Failure",
            message: `No tour with id ${id} has been found` 

        });
    }
    res.status(200).json({
        status: "Success",
        data: {
            tour: "<updated tour>"
        }
    });
}

exports.deleteTour = (req, res) => {
    const id = convertID(req.params.id)
    if (!validateID(id)) {
        return res.status(404).json({
            status: "Failure",
            message: `No tour with id ${id} has been found` 

        });
    }
    res.status(204).json({
        status: "Success",
        data: null
        
    });
}
