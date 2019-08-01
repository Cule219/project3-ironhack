const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get('/', (req, res) => {
  User.find({}).then(users => {
    res.json(users)
  }).catch(err=>res.json(err));
});

router.get('/:id', (req, res) => {
  User.findById(req.params.id).then(user=>
    res.json(user))
  .catch(err=>res.json(err));
});

router.put('/:id', (req, res) => {
  const {username, profileImg, githubLlink, role} = req.body
  User.findByIdAndUpdate(req.params.id, {username, profileImg, githubLlink, role}).then(user =>
    res.json(user))
    .catch(err=>res.json(err));
})

module.exports = router;