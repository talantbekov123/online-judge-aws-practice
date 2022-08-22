/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
const { Schema } = mongoose;

const SubmissionSchema = new Schema(
  {
    code: {
      type: String,
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

const Submission = mongoose.model('Submission', SubmissionSchema);

module.exports = (registry) => {
  registry.Submission = Submission;
};
