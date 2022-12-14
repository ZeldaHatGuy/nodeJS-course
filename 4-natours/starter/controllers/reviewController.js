const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const ApiFeatures = require('../utils/apiFeatures');
const APIFeatures = require('../utils/apiFeatures');
const sendResponse = require('../utils/sendResponse');
const factory = require('./handlerFactory');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };

  const features = new APIFeatures(Review.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const reviews = await features.query;
  sendResponse(res, 'Successful', 200, reviews);
});

exports.getReview = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Review.findById(req.params.id), req.query)
    .filter()
    .limitFields();
  const review = await features.query;
  if (review.length === 0) {
    return next(new AppError('Unable to find review with that id', 404));
  }
  sendResponse(res, 'Successful', 200, review);
});

exports.createReview = catchAsync(async (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;

  const newReview = await Review.create(req.body);
  sendResponse(res, 'Successful', 201, newReview);
});

exports.deleteReview = factory.deleteOne(Review);
exports.createReview = factory.createOne(Review);
exports.getReview = factory.findOne(Review);
exports.getAllReviews = factory.findAll(Review);
