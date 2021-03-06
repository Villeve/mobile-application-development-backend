const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateFaculty(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  // Email checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  if (Validator.isEmpty(data.university)) {
    errors.name = "University field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
