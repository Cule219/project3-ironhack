const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Card = require("../models/Card");

router.get("/", (req, res) => {
  User.find({})
    .then(users => {
      res.json(users);
    })
    .catch(err => res.json(err));
});

router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

router.put("/:id", (req, res) => {
  const { username, profileImg, githubLlink, role } = req.body;
  User.findByIdAndUpdate(req.params.id, {
    username,
    profileImg,
    githubLlink,
    role
  })
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

router.post("/lessons/:id/:userid", (req, res, next) => {
  let status = req.body;
  User.findById(req.params.userid)
    .then(user => {
      let completedItems = user.completedItems;
      console.log(completedItems, req.params.id, status);
      let index = completedItems.findIndex(el => el.trelloId === req.params.id);
      if (index !== -1) {
        completedItems.splice(index, 1);
      } else {
        Card.find({ id: req.params.id })
          .then(card => {
            completedItems.push({ card: card.id, trelloId: req.params.id });
            User.findByIdAndUpdate(
              req.params.userid,
              { completedItems: completedItems },
              { new: true }
            )
              .then(user => {
                console.log(user, card);
                res.json(card);
              })
              .catch(err => {
                console.log("error updating user: ", err);
              });
          })
          .catch(err => {
            console.log("error finding card to update completed items: ", err);
          });
      }
    })
    .catch(err => {
      console.log(
        "error finding the user to even get his list of completed items: ",
        err
      );
    });
});

module.exports = router;
