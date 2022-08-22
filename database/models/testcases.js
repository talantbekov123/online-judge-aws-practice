/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
const { Schema } = mongoose;

const TestcaseSchema = new Schema(
  {
    inputArgs: {
      type: Array,
      default: [],
      required: true
    },
    expectedOutput: {
      type: Object,
      required: true
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const Testcase = mongoose.model('Testcase', TestcaseSchema);

module.exports = (registry) => {
  registry.Testcase = Testcase;
};
