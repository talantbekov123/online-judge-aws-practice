/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProblemSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    difficulty: {
      type: String,
      required: true
    },
    /*
      0 - not submited
      1 - accepted
      2 - failed
    */
    verdict: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const Problem = mongoose.model('Problem', ProblemSchema);

module.exports = (registry) => {
  registry.Problem = Problem;
};
