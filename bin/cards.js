const mongoose = require("mongoose");
const axios = require("axios");
const List = require("../models/List");
const Card = require("../models/Card");
const getTitleAtUrl = require("get-title-at-url");
//const axiosRetry = require('axios-retry')
//const request     = require('superagent')
//const Throttle    = require('superagent-throttle')

mongoose //mongodb://heroku_chsmp865:f6rjf7odat3pdah70k8jpt0iab@ds153947.mlab.com:53947/heroku_chsmp865
  //.connect(
  //  "mongodb://heroku_chsmp865:f6rjf7odat3pdah70k8jpt0iab@ds153947.mlab.com:53947/heroku_chsmp865",
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

function updateCardsWithAttachments() {
  return Card.find({})
    .then(cards => {
      // return cards.slice(0, 99)
      // return cards.slice(100, 199)
      return cards.slice(200, 220).map(card => {
        getUrlsFromCard(card.id)
          .then(urls => {
            Card.findByIdAndUpdate(card._id, { attachments: urls })
              .then(response => {
                // console.log(response);
              })
              .catch(err => {
                console.log("error updating card ", err);
              });
          })
          .catch(err => {
            console.log("error getting urls :", err);
          });
      });
    })
    .catch(err => {
      console.log("error while finding cards ", err);
    });
}

function getUrlsFromCard(cardId) {
  return axios
    .get(
      `https://api.trello.com/1/cards/${cardId}/attachments?key=eb627225b1977b30f088094e7b793383&token=596e22c5d280793a5bd98c6883d6e1014fe4cc18b549f4fafbdd3a5947ed07ac`
    )
    .then(resp => resp.data.map(el => el.url));
}

function updateDescription() {
  Card.find({ desc: { $ne: "" } })
    .then(cards => {
      cards.forEach(card => {
        console.log(card);
        let regex = new RegExp(/\s*\[(.*?)\)\s*/, "g");
        let matches = card.desc.match(regex) || [];
        let links = matches.map(el => {
          let arr = el.split(/\[|\)|\]|\(/);
          return `<a href=${arr[3]}>${arr[1]}</a><br>`;
        });
        var desc = card.desc;
        for (let i = 0; i < matches.length; i++) {
          desc = desc.replace(matches[i], links[i]);
        }
        let wordsArray = desc.split(/\n|\s/);
        let titlePromises = wordsArray.map(str => {
          if (validURL(str)) {
            return getTitlePromisified(str);
          } else {
            return str;
          }
        });
        Promise.all(titlePromises)
          .then(data => {
            let descrip = wordsArray
              .map((str, index) =>
                validURL(str) ? `<a href=${str}>${data[index]}</a><br>` : str
              )
              .join(" ");
            Card.findByIdAndUpdate(card._id, { desc: descrip }, { new: true })
              .then(c => console.log(c))
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {
            console.log("error in promises", err);
          });
      });
    })
    .catch(err => {
      console.log(err);
    });
}

function validURL(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

const getTitlePromisified = url =>
  new Promise((resolve, reject) => {
    getTitleAtUrl(url, title => {
      resolve(title);
    });
  });

//updateCardsWithAttachments();
updateDescription();
//updateDescriptionCheatSheets();

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
