/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProblemSchema = new Schema(
  {
    name: {
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
    testcases: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Testcase' }],
      default: []
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
