const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const FacultySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  courses: {
      type: Array,
      required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Faculty = mongoose.model("faculties", FacultySchema);