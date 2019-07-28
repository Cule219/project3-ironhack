//this is for initial DB board loading
const mongoose = require("mongoose");
const axios = require("axios");
const Board = require("../models/Board");
const List = require("../models/List");
const Card = require("../models/Card");

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
        List.create({
          id,
          name,
          closed,
          idBoard,
          week,
          day
        })
          .then(async data => 
            cards(data.id)
          )
          .catch(err => console.log(err));
      });
    })
    .catch(err => console.log(err));

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
      // if(Board.findOne({id: id}))console.log('Board exists');
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
    .get(
      `https://api.trello.com/1/lists/${list}/cards`
    )
    .then(response => {
      response.data.map(card => {
        // console.log(populateCard(card))
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
          url
        } = card;
        let category = name.indexOf("|") !== -1 ? name.substr(0, name.indexOf("|")).trim() : null;
        Card.create({
          id,
          name,
          dataLastActivity,
          desc,
          descData,
          idBoard,
          idList,
          idLabels,
          // attachments,
          shortUrl,
          category,
          url
        })
        .then(card => 
          List.findOneAndUpdate({ id: list}, {$push: {cards: card._id}})
          
        ).catch(err => console.log(err));
      });
    })
    .catch(err => console.log(err));

module.exports = board, lists;

let removeAll = () => {
  List.deleteMany();
  Card.deleteMany();
  Board.deleteMany();
}
// removeAll();

board("JIVynIm1");

lists("JIVynIm1");



// .then(() => {
//   // Close properly the connection to Mongoose
//   mongoose.disconnect()
// })
// .catch(err => {
//   mongoose.disconnect()
//   throw err
// })

function populateCard(card) {
  let name = card.name;
  let category =
    name.indexOf("|") !== -1 ? name.substr(0, name.indexOf("|")).trim() : null;
    console.log(card, category)
  if(card.labels){
  let labels = card.labels.map(el => el.name);
  return getUrlsFromCard(card.id).then(urls => {
    return { name, category, labels, id: card.id, attachments: urls };
  });}
}

function getUrlsFromCard(cardId) {
  return axios
    .get(
      `https://api.trello.com/1/cards/${cardId}/attachments`
    )
    .then(resp => resp.data.map(el => el.url));
}

function getCategoriesFromCards(cards) {
    return cards
      .map(el => el.name)
      .filter(el => el.indexOf("|") !== -1)
      .map(el => el.substr(0, el.indexOf("|")).trim());
}


// {
//   "id": "560bf4298b3dda300c18d09c",
//   "name": "US National Parks",
//   "desc": "",
//   "descData": null,
//   "closed": false,
//   "idOrganization": "577eb8850b41e08c3034aae2",
//   "invited": false,
//   "pinned": false,
//   "starred": true,
//   "url": "https://trello.com/b/tBmYPSYe/us-national-parks",
//   "prefs": {
//     "permissionLevel": "public",
//     "voting": "disabled",
//     "comments": "members",
//     "invitations": "members",
//     "selfJoin": true,
//     "cardCovers": true,
//     "cardAging": "regular",
//     "calendarFeedEnabled": false,
//     "background": "560bfbb5176d070c67adc2b9",
//     "backgroundImage": "https://trello-backgrounds.s3.amazonaws.com/556c8537a1928ba745504dd8/1920x1080/b5ab43954a54880e455d3b4e5109644c/Bryce_Canyon.jpg",
//     "backgroundImageScaled": [
//       {
//         "width": 140,
//         "height": 100,
//         "url": "https://trello-backgrounds.s3.amazonaws.com/556c8537a1928ba745504dd8/140x100/cf6ffdfac5ecf934ec324bf028b82686/Bryce_Canyon.jpg"
//       },
//       {
//         "width": 256,
//         "height": 192,
//         "url": "https://trello-backgrounds.s3.amazonaws.com/556c8537a1928ba745504dd8/256x192/2189d1f2d6c159c7de210412cc0e971f/Bryce_Canyon.jpg"
//       },
//       {
//         "width": 480,
//         "height": 480,
//         "url": "https://trello-backgrounds.s3.amazonaws.com/556c8537a1928ba745504dd8/480x480/62bde347e629774a83378caf61f0fdb7/Bryce_Canyon.jpg"
//       },
//       {
//         "width": 960,
//         "height": 960,
//         "url": "https://trello-backgrounds.s3.amazonaws.com/556c8537a1928ba745504dd8/960x960/3102fa79837dfd37834cfaee02d1921c/Bryce_Canyon.jpg"
//       },
//       {
//         "width": 1024,
//         "height": 1024,
//         "url": "https://trello-backgrounds.s3.amazonaws.com/556c8537a1928ba745504dd8/1024x1024/53a50ede7425af0b02a7b9bde783fe94/Bryce_Canyon.jpg"
//       },
//       {
//         "width": 1280,
//         "height": 1280,
//         "url": "https://trello-backgrounds.s3.amazonaws.com/556c8537a1928ba745504dd8/1280x1280/491f54004976a4a81706caae613acf7f/Bryce_Canyon.jpg"
//       },
//       {
//         "width": 1920,
//         "height": 1080,
//         "url": "https://trello-backgrounds.s3.amazonaws.com/556c8537a1928ba745504dd8/1920x1080/b5ab43954a54880e455d3b4e5109644c/Bryce_Canyon.jpg"
//       }
//     ],
//     "backgroundTile": false,
//     "backgroundBrightness": "light",
//     "canBePublic": false,
//     "canBeOrg": false,
//     "canBePrivate": false,
//     "canInvite": true
//   },
//   "invitations": [
    
//   ],
//   "memberships": [
//     {
//       "id": "560bf4298b3dda300c18d09d",
//       "idMember": "556c8537a1928ba745504dd8",
//       "memberType": "admin",
//       "unconfirmed": false,
//       "deactivated": false
//     },
//     {
//       "id": "58ebc5d5abcedaf34a60800e",
//       "idMember": "56fd3de8ba3cbeb22737fd55",
//       "memberType": "normal",
//       "unconfirmed": false,
//       "deactivated": false
//     }
//   ],
//   "shortLink": "tBmYPSYe",
//   "subscribed": false,
//   "labelNames": {
//     "green": "Visited",
//     "yellow": "",
//     "orange": "",
//     "red": "",
//     "purple": "",
//     "blue": "",
//     "sky": "",
//     "lime": "",
//     "pink": "",
//     "black": ""
//   },
//   "powerUps": [
    
//   ],
//   "dateLastActivity": "2017-06-26T17:39:49.583Z",
//   "dateLastView": "2017-06-26T17:43:56.319Z",
//   "shortUrl": "https://trello.com/b/tBmYPSYe",
//   "idTags": [
    
//   ],
//   "datePluginDisable": null
// }