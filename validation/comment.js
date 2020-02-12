const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateComment(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.postedBy = !isEmpty(data.postedBy) ? data.postedBy : "";
  data.courseId = !isEmpty(data.courseId) ? data.courseId : "";
  data.content = !isEmpty(data.content) ? data.content : "";
  // Email checks
  if (Validator.isEmpty(data.postedBy)) {
    errors.postedBy = "postedBy field is required";
  }
  if (Validator.isEmpty(data.courseId)) {
    errors.courseId = "courseId field is required";
  }
  if (Validator.isEmpty(data.content)) {
    errors.content = "content field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
