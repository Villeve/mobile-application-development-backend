const express = require("express");
const router = express.Router();

// Load input validation
const validateUniversityInput = require("../../validation/university");
// Load University model
const University = require("../../models/University");
const auth = require("./auth")


// @route POST api/universities
// @desc create University
// @access Private
router.post("/", auth.required, (req, res) => {
    // Form validation
    const { errors, isValid } = validateUniversityInput(req.body);
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    
      const newUniversity = new University({
        name: req.body.name
    });

    newUniversity
        .save()
        .then(university => res.json(university))
        .catch(err => console.log(err));
});

// @route GET api/universities
// @desc get Universities
// @access Private
router.get("/", auth.required, (req, res) => {
  University.find({}).then(result => {
    res.json(result)
  })
  .catch(err => console.log(err));
});

// @route GET api/universities/id
// @desc Get one university
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
router.delete("/:id", auth.required, auth.checkUserIsAdmin, (req, res) => {
  University.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
  .catch(err => console.log(err));
});

module.exports = router;