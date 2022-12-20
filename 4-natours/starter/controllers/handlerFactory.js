const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const ApiFeatures = require('../utils/apiFeatures');
const sendResponse = require('../utils/sendResponse');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = {};
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    sendResponse(res, 'Success', 204, data);
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    sendResponse(res, 'Success', 200, doc);
  });
exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    sendResponse(res, 'Success', 200, doc);
  });
exports.findOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const features = await new ApiFeatures(
      Model.findById(req.params.id),
      req.query
    )
      .filter()
      .limitFields();
    const doc = await features.query;
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    sendResponse(res, 'Success', 200, doc);
  });
exports.findAll = (Model, filter = {}) =>
  catchAsync(async (req, res, next) => {
    const features = await new ApiFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const doc = await features.query.explain();
    const doc = await features.query.explain();
    if (!doc) {
      return next(new AppError('No documents found', 404));
    }
    sendResponse(res, 'Success', 200, doc);
  });
exports.findOneByField = (Model, filter) => {
  catchAsync(async (req, res, next) => {
    const doc = await Model.findOne(filter);
    if (!doc) {
      return next(new AppError('Unable to find document', 404));
    }
    sendResponse(res, 'Success', 200, doc);
  });
};

// exports.findAllByField = (Model, filter) => {
//   catchAsync(async (req, res, next) => {
//     const features = await new ApiFeatures(Model.find(filter), req.query)
//       .filter()
//       .sort()
//       .limitFields()
//       .paginate();
//     const doc = await features.query;
//     if (!doc) {
//       return next(new AppError('No documents found', 404));
//     }
//   });
// };
