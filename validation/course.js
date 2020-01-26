const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateCourse(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.facultyId = !isEmpty(data.facultyId) ? data.facultyId : "";
  data.code = !isEmpty(data.code) ? data.code : "";
  data.scope = !isEmpty(data.scope) ? data.scope : "";
  data.teacher = !isEmpty(data.teacher) ? data.teacher : "";
  data.objectives = !isEmpty(data.objectives) ? data.objectives : "";
// Email checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  if (Validator.isEmpty(data.facultyId)) {
    errors.name = "facultuId field is required";
  }
  if (Validator.isEmpty(data.code)) {
    errors.name = "code field is required";
  }
  if (Validator.isEmpty(data.scope)) {
    errors.name = "scope field is required";
  }
  if (Validator.isEmpty(data.teacher)) {
    errors.name = "teacher field is required";
  }
  if (Validator.isEmpty(data.objectives)) {
    errors.name = "objectives field is required";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};