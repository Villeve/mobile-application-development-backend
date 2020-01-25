const express = require("express");
const router = express.Router();

// Load input validation
const validateFacultyInput = require("../../validation/faculty");
// Load University model
const Faculty = require("../../models/Faculty");
const auth = require("./auth")

// @route POST api/faculties
// @desc create Faculty
// @access Private
router.post("/", auth.required, (req, res) => {
    // Form validation
    const { errors, isValid } = validateFacultyInput(req.body);
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newFaculty = new Faculty({
        name: req.body.name,
        university: req.body.university
    });
    newFaculty
        .save()
        .then(faculty => res.json(faculty))
        .catch(err => console.log(err));
});


// @route GET api/faculties
// @desc get faculties
// @access Private
router.get("/:id", auth.required, (req, res) => {
  const universityId = req.params.id
  console.log(universityId)
  Faculty.find({}).then(result => {
    return res.json(
        result.filter(faculty => faculty.university == universityId)
    )
  })
  .catch(err => console.log(err));
});
/*
// @route GET api/faculties/id
// @desc Get one faculty
// @access Private
router.get("/:id", auth.required, (req, res) => {
  const id = req.params.id;
  University.find({}).then(universities => {
    universities.forEach(university => {
      if(university.id === id) {
        res.json(university)
      }
      else {
        res.status(404).end()
      }
    })
  })
})
// @route DELETE api/universities/id
// @desc DELETE one university
// @access Private
router.delete("/:id", auth.required, (req, res) => {
  University.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
  .catch(err => console.log(err));
});
*/
module.exports = router;