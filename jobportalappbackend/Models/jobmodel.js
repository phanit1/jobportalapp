const mongoose = require("mongoose");

const jobData = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["full-time", "part-time", "contract"],
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  applications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "applicationmodel",
    },
  ],
});

module.exports = mongoose.model("jobdata", jobData);


// {
//   "title": "MEAN Developer",
// "description": "Developer with Angular And NodeJS skills",
// "location": "Hyderabad",
// "salary": 60000,
// "type": "full-time",
// "companyName": "Google"
// }
