const mongoose = require('mongoose');
const validator = require('validator');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'A tour must have a rating'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'A tour must have a rating'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tour: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Tour',
        required: [true, 'You must specify a tour you want to review'],
      },
    ],

    author: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'You must provide a review author'],
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
