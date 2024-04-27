const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  logoURL: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    reqired: true,
  },
  location: {
    type: String,
    required: true,
  },
  locationType: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  aboutCompany: {
    type: String,
  },
  skills: {
    type: Array,
    required: true,
  },
  information: {
    type: String,
  },
  refUserId:{
    type:mongoose.ObjectId,
  }
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
