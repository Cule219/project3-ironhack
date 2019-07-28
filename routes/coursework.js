const express = require("express");
const router = express.Router();
const Card = require("../models/Card");
const List = require("../models/List");
const Note = require("../models/Note");
const Board = require("../models/Board");

router.get("/", (req, res) => {
  Board.findOne({ name: "ftwd-june-berlin" })
    .then(board => {
      res.json(board);
    })
    .catch(err => {
      console.log(err);
    });
});

//get /modules /modules/:id


router.get("/weeks", (req, res) => {
  List.find({})
    .then(weeks => {
      res.json(weeks);
    })
    .catch(err => {
      console.log(err);
    });
});

//get weeks/:id ----- > id will be number of the week
router.get('/weeks/:id', (req, res) => {
  List.find({week: req.params.id}).then(week => {
    res.json(week)
  }).catch(err=>console.log(err))
});

router.get("/lessons", (req, res) => {
  Card.find({})
    .then(lessons => {
      res.json(lessons);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/weeks/:id", (req, res) => {
  List.findOne({ id: req.params.id })
    .populate("cards") //struggling here, I can't get it to populate. will look more in the morning
    .then(week => {
      res.json(week);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
