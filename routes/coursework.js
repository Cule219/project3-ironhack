const express = require("express");
const router = express.Router();
const Card = require("../models/Card");
const List = require("../models/List");
const Board = require("../models/Board");
const Module = require("../models/Module");

router.get("/", (req, res) => {
  Board.findOne({ name: "ftwd-june-berlin" })
    .then(board => {
      res.json(board);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/days", (req, res, next) => {
  List.find({})
    .then(days => {
      res.json(days);
    })
    .catch(err => {
      console.log(err);
    });
});

//get weeks/:id ----- > id will be number of the week
router.get("/weeks/:id", (req, res) => {
  List.find({ week: req.params.id })
    .then(week => {
      res.json(week);
    })
    .catch(err => console.log(err));
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

router.get("/days/:id", (req, res, next) => {
  List.findOne({ id: req.params.id })
    .populate("cards")
    .then(day => {
      res.json(day);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/weeks/:number", (req, res, next) => {
  List.find({ week: req.params.number.toString() })
    .populate("cards")
    .then(week => {
      res.json(week);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/weeks", (req, res, next) => {
  List.find({})
    .populate("cards")
    .then(days => {
      let weeks = [];
      for (var i = 1; i < 10; i++) {
        let week = days.filter(el => el.week === i.toString());
        weeks.push(week);
      }
      res.json(weeks);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/modules", (req, res, next) => {
  Module.find({})
    .then(modules => res.json(modules))
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
