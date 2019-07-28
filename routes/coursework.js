const express = require("express");
const router = express.Router();
const Card = require("../models/Card");
const List = require("../models/List");
const Note = require("../models/Note");
const Board = require("../models/Board");

router.get("/", (req, res, next) => {
  Board.findOne({ name: "ftwd-june-berlin" })
    .then(board => {
      console.log(board);
      res.json(board);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/weeks", (req, res, next) => {
  List.find({})
    .then(weeks => {
      console.log(weeks);
      res.json(weeks);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/lessons", (req, res, next) => {
  Card.find({})
    .then(lessons => {
      console.log(lessons);
      res.json(lessons);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/weeks/:id", (req, res, next) => {
  List.findOne({ id: req.params.id })
    .populate("cards") //struggling here, I can't get it to populate. will look more in the morning
    .then(week => {
      console.log("here's the week I found", week);
      res.json(week);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
