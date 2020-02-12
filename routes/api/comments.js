const express = require("express");
const router = express.Router();

// Load input validation
const validateCommentInput = require("../../validation/comment");
// Load Comment model
const Comment = require("../../models/Comment");
const auth = require("./auth");

// @route POST api/Comments
// @desc create Comment
// @access Private
router.post("/", auth.required, (req, res) => {
  // Form validation
  const { errors, isValid } = validateCommentInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const newComment = new Comment({
    postedBy: req.body.postedBy,
    courseId: req.body.courseId,
    content: req.body.content
  });
  newComment
    .save()
    .then(comment => res.json(comment))
    .catch(err => console.log(err));
});

// @route GET api/Comments
// @desc get Comments
// @access Private
router.get("/:id", auth.required, (req, res) => {
  const courseId = req.params.id;
  Comment.find({})
    .then(result => {
      return res.json(result.filter(comment => comment.courseId == courseId));
    })
    .catch(err => console.log(err));
});

// @route DELETE api/Comments/id
// @desc DELETE one Comment
// @access Private
router.delete("/:id", auth.required, (req, res) => {
  Comment.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end();
    })
    .catch(err => console.log(err));
});

module.exports = router;
