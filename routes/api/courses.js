const express = require("express");
const router = express.Router();

// Load input validation
const validateCourseInput = require("../../validation/course");
// Load Course model
const Course = require("../../models/Course");
const auth = require("./auth");

// @route POST api/courses
// @desc create Course
// @access Private
router.post("/", auth.required, auth.checkUserIsAdmin(), (req, res) => {
  // Form validation
  const { errors, isValid } = validateCourseInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const newCourse = new Course({
    name: req.body.name,
    facultyId: req.body.facultyId,
    code: req.body.code,
    scope: req.body.scope,
    teacher: req.body.teacher,
    objectives: req.body.objectives
  });
  newCourse
    .save()
    .then(course => res.json(course))
    .catch(err => console.log(err));
});

// @route GET api/courses
// @desc get courses
// @access Private
router.get("/:id", auth.required, (req, res) => {
  const facultyId = req.params.id;
  Course.find({})
    .then(result => {
      return res.json(result.filter(course => course.facultyId == facultyId));
    })
    .catch(err => console.log(err));
});

// @route DELETE api/courses/id
// @desc DELETE one course
// @access Private
router.delete("/:id", auth.required, auth.checkUserIsAdmin(), (req, res) => {
  Course.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end();
    })
    .catch(err => console.log(err));
});

module.exports = router;
