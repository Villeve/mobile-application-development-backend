const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateUniversity(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
// Email checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }/* else if (!Validator.name(data.name)) {
    errors.name = "Name is invalid";
  }
  */
return {
    errors,
    isValid: isEmpty(errors)
  };
};