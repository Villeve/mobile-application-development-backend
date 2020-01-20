const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const CourseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  scope: {
    type: String,
    required: true
  },
  teacher: {
    type: String,
    required: true
  },
  objectives: {
    type: String,
    required: true
  },
  comments: {
      type: Array,
      required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Course = mongoose.model("courses", CourseSchema);