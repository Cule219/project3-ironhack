const mongoose = require("mongoose");
const axios = require("axios");
const List = require("../models/List");
const Card = require("../models/Card");
const getTitleAtUrl = require("get-title-at-url");

mongoose //mongodb://heroku_chsmp865:f6rjf7odat3pdah70k8jpt0iab@ds153947.mlab.com:53947/heroku_chsmp865
  .connect(
    "mongodb://heroku_chsmp865:f6rjf7odat3pdah70k8jpt0iab@ds153947.mlab.com:53947/heroku_chsmp865",
    /* .connect("mongodb://127.0.0.1/final-project-ironhack", */ {
      useNewUrlParser: true
    }
  )
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

const blogs_descrip = `## Blogs and Newsletters<a href=http://2ality.com/index.html>2ality</a><br>*JavaScript and more*<a href=https://overreacted.io/>Overreacted</a><br>*Blog from Redux creator Dan Abramov*<a href=https://davidwalsh.name/>David Walsh</a><br>*Senior Developer at Mozilla*<a href=https://www.robinwieruch.de/>rwieruch;</a><br><a href=https://dev.to/>DEV.to</a><br><a href=https://codeburst.io/>CodeBurst</a><br><a href=https://www.mozilla.org/en-US/newsletter/developer/>Mozilla Developer Newsletter</a><br><a href=https://javascriptweekly.com/>JavaScript Weekly</a><br><a href=http://reactjsnewsletter.com/>React Newsletter</a><br><a href=https://nodeweekly.com/>Node Weekly</a><br><a href=https://news.ycombinator.com/>HackerNews</a><br><a href=https://syndicode.com/tag/javascript-github/>Top JS Github Repos Monthly</a><br>### Reddit subs<a href=https://www.reddit.com/r/programming/>r/programming</a><br><a href=https://www.reddit.com/r/webdev/>r/webdev</a><br><a href=https://www.reddit.com/r/reactjs/>r/reactjs</a><br><a href=https://www.reddit.com/r/node/>r/node</a><br><a href=https://www.reddit.com/r/learnjavascript/>r/learnjavascript</a><br>`;

const books_descrip = `## Books
You can find pretty much a digital version of any book by googling **any book name + pdf**.

Some suggestions:<a href=https://github.com/NileshGule/Ebooks/blob/master/The%20Clean%20Coder%20A%20Code%20of%20Conduct%20for%20Professional%20Programmers.pdf>The Clean Coder</a><br>by Robert C. Martin
*A code of conduct for professional programmers*

The<a href=https://github.com/getify/You-Dont-Know-JS>You Don't Know JS</a><br>series by Kyle Simpson
*Up & Going, Scope & Closures, this & Object Prototypes, Types & Grammar, Async & Performance, ES6 & Beyond*<a href=http://exploringjs.com/es6/index.html>Exploring ES6</a><br>by Axel Rauschmayer
*Covers what’s new in ES6 (relative to ES5)*
see also<a href=http://exploringjs.com/es2016-es2017/index.html>Exploring ES2016 and ES2017</a><br>,<a href=http://exploringjs.com/es2018-es2019/toc.html>Exploring ES2018 and ES2019</a><br><a href=https://7chan.org/pr/src/OReilly_JavaScript_The_Good_Parts_May_2008.pdf>JavaScript, the Good Parts</a><br>by Douglas Crockford
see<a href=https://www.reddit.com/r/ProgrammerHumor/comments/621qrt/javascript_the_good_parts/>here</a><br>(although a bit old, still interesting)`;

const tutorials_descrip = `## Tutorials<a href=https://nodeschool.io/>NodeSchool</a><br><a href=https://egghead.io/>egghead</a><br><a href=https://www.udemy.com/>udemy</a><br><a href=https://www.pluralsight.com/>Pluralsight</a><br><a href=https://frontendmasters.com/>Frontend Masters</a><br><a href=https://www.freecodecamp.org/>freeCodeCamp</a><br><a href=https://www.coursera.org/>coursera</a><br><a href=https://www.youtube.com/user/TechGuyWeb>Traversy Media on YouTube</a><br>## Practice<a href=https://github.com/florinpop17/app-ideas/>app-ideas</a><br>*A Collection of application ideas which can be used to improve your coding skills*<a href=https://edabit.com/challenges/javascript/>edabit</a><br>*Code challenges*<a href=https://javascript30.com/>#JavaScript30</a><br>*Build 30 things in 30 days with 30 tutorials*<a href=https://github.com/30-seconds/30-seconds-of-interviews>30 seconds of interviews</a><br>## Job Searching<a href=https://angel.co/>AngelList</a><br>*Get a Job at a Startup*<a href=https://remoteok.io/>remoteOK</a><br>*Remote jobs. Also check out<a href=https://nomadlist.com/>nomadlist</a><br>*`;

const platforms_descrip = `### Freelancing platforms<a href=https://www.malt.com/>malt</a><br><a href=https://www.upwork.com/>upwork</a><br><a href=https://www.freelance.com/>freelance.com</a><br>## Open Source<a href=https://github.com/firstcontributions/first-contributions>first-contributions</a><br>*Hands-on tutorial that walks you through contributions workflow on github*<a href=https://up-for-grabs.net/#/>Up For Grabs</a><br>*List of issues reported in open source projects that the maintainers have identified as good projects to tackle for a beginner to the project*`;

const tools_descrip = `## Tools<a href=https://github.com/imfunniee/gitfolio/>Gitfolio</a><br>*personal website + blog for every github user*`;

const resourcesCards = [
  {
    id: "blogs", //Trello ID
    name: "Blogs",
    desc: blogs_descrip,
    idList: "monty",
    completable: false,
    tags: [{ name: "Additional info", color: "blue" }]
  },
  {
    id: "books", //Trello ID
    name: "Books",
    desc: books_descrip,
    idList: "monty",
    completable: false,
    tags: [{ name: "Additional info", color: "blue" }]
  },
  {
    id: "tutorials", //Trello ID
    name: "Tutorials",
    desc: tutorials_descrip,
    idList: "monty",
    completable: false,
    tags: [{ name: "Additional info", color: "blue" }]
  },
  {
    id: "platforms", //Trello ID
    name: "Platforms",
    desc: platforms_descrip,
    idList: "monty",
    completable: false,
    tags: [{ name: "Additional info", color: "blue" }]
  },
  {
    id: "tools", //Trello ID
    name: "Tools",
    desc: tools_descrip,
    idList: "monty",
    completable: false,
    tags: [{ name: "Additional info", color: "blue" }]
  }
];

const getTitlePromisified = url =>
  new Promise((resolve, reject) => {
    getTitleAtUrl(url, title => {
      resolve(title);
    });
  });

//updateCardsWithAttachments();
//updateDescription();
//updateDescriptionCheatSheets();
createOtherResourcesCards();

function createOtherResourcesCards() {
  Card.create(resourcesCards)
    .then(cards => {
      console.log(cards);
    })
    .catch(err => {
      console.log(err);
    });
}

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

function formatLinks(str) {
  let regex = new RegExp(/\s*\[(.*?)\)\s*/, "g");
  let matches = str.match(regex) || [];
  let links = matches.map(el => {
    let arr = el.split(/\[|\)|\]|\(/);
    return `<a href=${arr[3]}>${arr[1]}</a><br>`;
  });
  var formatted = str;
  for (let i = 0; i < matches.length; i++) {
    formatted = formatted.replace(matches[i], links[i]);
  }
  return formatted;
}
