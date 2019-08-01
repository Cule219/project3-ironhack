//this is for initial DB board loading
const mongoose = require("mongoose");
const axios = require("axios");
const Board = require("../models/Board");
const List = require("../models/List");
const Card = require("../models/Card");
const getTitleAtUrl = require("get-title-at-url");

const technologies = [
  "React",
  "Express",
  "JS",
  "CSS",
  "HTML",
  "MongoDB",
  "Node",
  "SG",
  "DOM",
  "P5",
  "jQuery",
  "ES6",
  "Mongoose",
  "Passport",
  "AJAX",
  "Axios",
  "JSON",
  "Google Maps"
];

mongoose //mongodb://heroku_chsmp865:f6rjf7odat3pdah70k8jpt0iab@ds153947.mlab.com:53947/heroku_chsmp865
  .connect("mongodb://127.0.0.1/final-project-ironhack", {
    useNewUrlParser: true
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const lists = board =>
  axios
    .get(
      `https://api.trello.com/1/boards/${board}/lists?key=eb627225b1977b30f088094e7b793383&token=596e22c5d280793a5bd98c6883d6e1014fe4cc18b549f4fafbdd3a5947ed07ac`
    )
    .then(response => {
      return response.data.map(list => {
        const { id, name, closed, idBoard } = list;
        let week = parseInt(name.split("Week ")[1]) || null;
        let day =
          parseInt(name.split("Day ")[name.split("Day ").length - 1]) || null;
        if (name.indexOf("MODULE I") !== -1) {
          week = 3;
          day = "extra";
        }
        if (name.indexOf("MODULE II") !== -1) {
          week = 6;
          day = "extra";
        }
        if (name.indexOf("MODULE III") !== -1) {
          week = 9;
          day = "extra";
        }
        if (name.indexOf("Resources") !== -1) {
          week = 0;
        }
        List.create({
          id,
          name,
          closed,
          idBoard,
          week,
          day
        }).then(data => cards(data.id));
      });
    });

const board = board => {
  //JIVynIm1 id for our cohort
  axios
    .get(
      `https://api.trello.com/1/boards/${board}?key=eb627225b1977b30f088094e7b793383&token=596e22c5d280793a5bd98c6883d6e1014fe4cc18b549f4fafbdd3a5947ed07ac`
    )
    .then(response => {
      const {
        id,
        name,
        desc,
        descData,
        closed,
        url,
        shortUrl,
        labelNames
      } = response.data;
      Board.create({
        id,
        name,
        desc,
        descData,
        closed,
        url,
        shortUrl,
        labelNames
      });
    })
    .catch(err => console.log(err));
};

const cards = list =>
  axios
    .get(`https://api.trello.com/1/lists/${list}/cards`)
    .then(response => {
      response.data.map(async card => {
        const {
          id,
          name,
          dataLastActivity,
          desc,
          descData,
          idBoard,
          idList,
          idLabels,
          shortUrl,
          url,
          labels
        } = card;
        let tech = [];
        let tags = labels.map(el => ({
          name: el.name,
          color: el.color === "yellow" ? "darkgoldenrod" : el.color
        }));
        if (name.match(new RegExp("lab", "i")))
          tags.push({ name: "LAB", color: "indigo" });
        technologies.forEach(el => {
          if (name.match(new RegExp(el, "i"))) tech.push(el);
        });
        Card.create({
          id,
          name,
          dataLastActivity,
          desc,
          descData,
          idBoard,
          idList,
          idLabels,
          shortUrl,
          tech,
          tags,
          url
        })
          .then(card => {
            List.findOneAndUpdate({ id: list }, { $push: { cards: card._id } })
              .then()
              .catch(err => {
                console.log("error finding and updating list ", err);
              });
          })
          .catch(err => console.log(err));
      });
    })
    .catch(err => console.log(err));

(module.exports = board), lists;

board("JIVynIm1");

lists("JIVynIm1");
