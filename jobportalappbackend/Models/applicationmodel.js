const mongoose = require("mongoose");

const applicationData = mongoose.Schema({
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'jobmodel',
      required: true
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'usermodel',
      required: true
    },
    status: {
      type: String,
      enum: ['applied', 'interviewing', 'rejected', 'hired'],
      default: 'applied'
    },
    resume: {
      type: String // URL or path to the resume file
    }
  });

module.exports = mongoose.model("applicationData", applicationData);