const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

//this is for user specific list note
router.get("/:id", (req, res)=>{
  Note.findOneAndUpdate({list: req.params.id, user: req.user._id}, {list: req.params.id, user: req.user._id}, {upsert: true, new: true}).then(data => {
    res.json(data);
  }).catch(err => res.json(err));
});

//this is for list note
router.get("/prot/:id", (req, res)=> {
  Note.findOneAndUpdate({list: req.params.id, user: {$exists: false}}, {list: req.params.id}, {upsert: true, new: true}).then(data => {
    res.json(data);
  }).catch(err => res.json(err));
})

router.put("/", (req, res)=>{
  Note.findByIdAndUpdate(req.params.noteId).then(data => {
    res.json({ message: `Project with id ${req.params.noteId} was successfully updated` });
  }).catch(err => res.json(err));
});

//not sure if needed
router.get("/:noteId", (req, res)=>{
  Note.findById(req.params.noteId).then(data => {
    res.status(200).json(data);
  }).catch(err => res.json(err));
});

//post cannot be deleted? maybe hidden/archived

module.exports = router;