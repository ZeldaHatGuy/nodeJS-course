const catchAsync = require('../utils/catchAsync');
const convertID = require('./helpers');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'Success',
    requestTime: req.requestTime,
    results: users.length,
    data: {
      users,
    },
  });
});

// exports.createUser = (req, res) => {
//   res.status(500).json({
//     status: 'Error',
//     message: 'This has not been implemented yet',
//   });
// };
exports.deleteUser = factory.deleteOne(User);
exports.updateUser = factory.updateOne(User);
exports.createUser = factory.createOne(User);
exports.getAllUsers = factory.findAll(User);
exports.getUser = factory.findOne(User);

// exports.updateUser = (req, res) => {
//   res.status(500).json({
//     status: 'Error',
//     message: 'This has not been implemented yet',
//   });
// };
// exports.getUser = (req, res) => {
//   res.status(500).json({
//     status: 'Error',
//     message: 'This has not been implemented yet',
//   });
// };

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError('You are not allowed to update your password', 401)
    );
  }
  const filterdBody = filterObj(req.body, 'name', 'email');
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filterdBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'Success',
    data: null,
  });
});
