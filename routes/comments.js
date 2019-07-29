const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// /api/lists/${this.props.data.match.params.id}/comments


router.get("/:id", (req, res)=>{
  Comment.find({list: req.params.id}).populate('user').then(data => {
    res.json(data);
  }).catch(err => res.json(err));
});

router.get("/:commentId", (req, res)=>{
  Comment.findById(req.params.commentId).then(data => {
    res.status(200).json(data);
  }).catch(err => res.json(err));
});

router.post("/", (req, res)=>{
  const {content, user, list} = req.body;
  Comment.create(
    {content, user, list}
    ).then(project => {
    res.status(200).json(project);
  }).catch(err => res.json(err));
});

router.delete("/:commentId", (req, res)=>{
  Comment.findByIdAndDelete(req.params.commentId).then(data => {
    res.json({ message: `Project with id ${id} was successfully deleted` });
  }).catch(err => res.json(err));
});

//put and patch are optional

module.exports = router;