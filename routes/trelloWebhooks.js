const express = require("express");
const router = express.Router();
const Card = require("../models/Card");
const List = require("../models/List");
const Board = require("../models/Board");
const Module = require("../models/Module");
const TrelloResponse = require("../models/TrelloResponse");

router.post('/trelloCallback', (req, res) => {
  console.log(req.body)
  TrelloResponse.create({response: req.body});
  res.status(200);
})
