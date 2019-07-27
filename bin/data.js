//this is for initial DB board loading
const mongoose  = require("mongoose");
const axios     = require('axios');
const Board     = require('../models/Board');
const List      = require('../models/List');
const Card      = require('../models/Card');

mongoose
  .connect('mongodb://localhost/final-project-ironhack', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const lists = (board) =>
axios.get(
  `https://api.trello.com/1/boards/${board}/lists?key=eb627225b1977b30f088094e7b793383&token=596e22c5d280793a5bd98c6883d6e1014fe4cc18b549f4fafbdd3a5947ed07ac`
).then(response => {
  return response.data.map(list => {
    const {id, name, closed, idBoard} = list;
    let week = parseInt(name.split("Week ")[1]) || null;
    let day  =
    parseInt(name.split("Day ")[name.split("Day ").length - 1]) || null;
    List.create({
      id, name, closed, idBoard, week, day
    }).then(data=>cards(data.id)).catch(err=>console.log(err))
  });
})
.catch(err => console.log(err));

const board = (board) => {//JIVynIm1 id for our cohort
  axios.get(
  `https://api.trello.com/1/boards/${board}?key=eb627225b1977b30f088094e7b793383&token=596e22c5d280793a5bd98c6883d6e1014fe4cc18b549f4fafbdd3a5947ed07ac`
  ).then(response => {
    const {id, name, desc, descData, closed, url, shortUrl, labelNames} = response.data;
    Board.findOne({id: id});
    // if(Board.findOne({id: id}))console.log('Board exists');
    Board.create({
      id, name, desc, descData, closed, url, shortUrl, labelNames
    })
  }).catch(err => console.log(err));
}

const cards = list => axios.get(
  `https://api.trello.com/1/lists/${list}/cards`
  // ?key=eb627225b1977b30f088094e7b793383&token=596e22c5d280793a5bd98c6883d6e1014fe4cc18b549f4fafbdd3a5947ed07ac`
).then( response => {
  //still need to figure out technology and tags(those will be from idLabels)
  response.data.map(card => {
    const {id, name, dataLastActivity, desc, descData, idBoard, idList, idLabels, shortUrl, url} = card;
    Card.create({
      id, name, dataLastActivity, desc, descData, idBoard, idList, idLabels, shortUrl, url
    }).then(card => console.log(card._id)).catch(err=>console.log(err))
  })
}).catch(err => console.log(err));

board('JIVynIm1');

lists('JIVynIm1');



// .then(() => {
//   // Close properly the connection to Mongoose
//   mongoose.disconnect()
// })
// .catch(err => {
//   mongoose.disconnect()
//   throw err
// })

// function populateCard(card) {
//   let name = card.name;
//   let category =
//     name.indexOf("|") !== -1 ? name.substr(0, name.indexOf("|")).trim() : null;
//   let desc = card.desc;
//   if(card.labels){
//   let labels = card.labels.map(el => el.name);
//   return getUrlsFromCard(card.id).then(urls => {
//     return { name, category, desc, labels, id: card.id, attachments: urls };
//   });}
// }

// function getUrlsFromCard(cardId) {
//   return axios
//     .get(
//       `https://api.trello.com/1/cards/${cardId}/attachments?key=eb627225b1977b30f088094e7b793383&token=596e22c5d280793a5bd98c6883d6e1014fe4cc18b549f4fafbdd3a5947ed07ac`
//     )
//     .then(resp => resp.data.map(el => el.url));
// }


// function getCategoriesFromCards() {
//   getCards().then(cards => {
//     let categories = cards
//       .map(el => el.name)
//       .filter(el => el.indexOf("|") !== -1)
//       .map(el => el.substr(0, el.indexOf("|")).trim());
//     console.log(categories);
//   });
// }