const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UniversitySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  faculties: {
    type: Array,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = University = mongoose.model("universities", UniversitySchema);
