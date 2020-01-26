const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const CommentSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  postedBy: {
    type: String,
    required: true
  },
  courseId: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Comment = mongoose.model("comments", CommentSchema);