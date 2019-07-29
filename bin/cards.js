const mongoose = require("mongoose");
const axios = require("axios");
const List = require("../models/List");
const Card = require("../models/Card");
const axiosRetry = require('axios-retry')
const request     = require('superagent')
const Throttle    = require('superagent-throttle')

mongoose
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
// axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

let cards; 
Card.find({}).then(cards => {
  cards = cards.map(x => {
  // let attachments = getUrlsFromCard(x.id);
    x.id
  // Card.findByIdAndUpdate(x._id, {attachments});s
  })
});

console.log(cards)
// let i=0
// setInterval(() => {
//   console.log(cards[i])
//   let attachments = getUrlsFromCard(cards[i]);
//   // console.log(attachments)
//   i++
// }, 500);

// Card.findByIdAndUpdate(cards[i], {attachments})

// let throttle = new Throttle({
//   active: true,     // set false to pause queue
//   rate: 98,          // how many requests can be sent every `ratePer`
//   ratePer: 3000,   // number of ms in which `rate` requests may be sent
//   concurrent: 1     // how many requests can be sent concurrently
// })

// function getUrlsFromCard(cardId) {
// return axios
//   .get(
//     `https://api.trello.com/1/cards/${cardId}/attachments`
//   )
//   .then(resp => resp.data.map(el => el.url));

// request
// .get(`https://api.trello.com/1/cards/${cardId}/attachments`)
// .use(throttle.plugin())
// .end((err, res) => res.data.map(el => el.url))
// }





// .then(() => {
//   // Close properly the connection to Mongoose
//   mongoose.disconnect()
// })
// .catch(err => {
//   mongoose.disconnect()
//   throw err
// })