const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");

router.get("/", (req, res)=>{
  //this needs to be changed to look for comments for specific lesson 
  Comment.find({}).populate('user').then(data => {
    res.json(data);
  }).catch(err => res.json(err));
});

router.get("/:commentId", (req, res)=>{
  Comment.findById(req.params.commentId).then(data => {
    res.status(200).json(data);
  }).catch(err => res.json(err));
});

router.post("/", (req, res)=>{
  const {content: content, user} = req.body;
  Comment.create(
    {content, user}//lesson
    ).then(project => {
    res.status(200).json(project);
  }).catch(err => res.json(err));
});

router.delete("/:commentId", (req, res)=>{
  Comment.deleteOne(req.params.commentId).then(data => {
    res.json({ message: `Project with id ${id} was successfully deleted` });
  }).catch(err => res.json(err));
});

//put and patch are optional

module.exports = router;