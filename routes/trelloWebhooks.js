const express = require("express");
const router = express.Router();
const Card = require("../models/Card");
const List = require("../models/List");
const Board = require("../models/Board");
const Module = require("../models/Module");

router.post('/trelloCallback', (req, res) => {
  console.log(req.body);
  res.status(200);
})
