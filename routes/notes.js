const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

router.get("/", (req, res)=>{
  Note.find({}).populate('user').then(data => {
    res.json(data);
  }).catch(err => res.json(err));
});

router.get("/:noteId", (req, res)=>{
  Note.findById(req.params.noteId).then(data => {
    res.status(200).json(data);
  }).catch(err => res.json(err));
});

router.post("/", (req, res)=>{
  const {content, user} = req.body;
  Note.create(
    {content, user, lesson}//lesson
    ).then(project => {
    res.status(200).json(project);
  }).catch(err => res.json(err));
});

router.put("/:noteId", (req, res)=>{
  Note.findByIdAndUpdate(req.params.noteId, ).then(data => {
    res.json({ message: `Project with id ${req.params.noteId} was successfully updated` });
  }).catch(err => res.json(err));
});

//post cannot be deleted? maybe hidden/archived

module.exports = router;