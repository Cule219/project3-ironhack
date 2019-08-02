const mongoose = require("mongoose");
const axios = require("axios");
const List = require("../models/List");
const Card = require("../models/Card");
const getTitleAtUrl = require("get-title-at-url");
//const axiosRetry = require('axios-retry')
//const request     = require('superagent')
//const Throttle    = require('superagent-throttle')

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

const getTitlePromisified = url =>
  new Promise((resolve, reject) => {
    getTitleAtUrl(url, title => {
      resolve(title);
    });
  });

updateCardsWithAttachments();
updateDescription();
//updateDescriptionCheatSheets();
//formatLinks(otherLinks);

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

const otherLinks = `## Blogs and Newsletters

[2ality](http://2ality.com/index.html)  
*JavaScript and more*

[Overreacted](https://overreacted.io/)  
*Blog from Redux creator Dan Abramov*

[David Walsh](https://davidwalsh.name/)  
*Senior Developer at Mozilla*

[rwieruch;](https://www.robinwieruch.de/)

[DEV.to](https://dev.to/)

[CodeBurst](https://codeburst.io/)

[Mozilla Developer Newsletter](https://www.mozilla.org/en-US/newsletter/developer/)

[JavaScript Weekly](https://javascriptweekly.com/)

[React Newsletter](http://reactjsnewsletter.com/)

[Node Weekly](https://nodeweekly.com/)

[HackerNews](https://news.ycombinator.com/)

[Top JS Github Repos Monthly](https://syndicode.com/tag/javascript-github/)  

### Reddit subs

[r/programming](https://www.reddit.com/r/programming/)  
[r/webdev](https://www.reddit.com/r/webdev/)  
[r/reactjs](https://www.reddit.com/r/reactjs/)  
[r/node](https://www.reddit.com/r/node/)  
[r/learnjavascript](https://www.reddit.com/r/learnjavascript/)  

## Books
You can find pretty much a digital version of any book by googling **any book name + pdf**.

Some suggestions:

[The Clean Coder](https://github.com/NileshGule/Ebooks/blob/master/The%20Clean%20Coder%20A%20Code%20of%20Conduct%20for%20Professional%20Programmers.pdf) by Robert C. Martin  
*A code of conduct for professional programmers*

The [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS) series by Kyle Simpson  
*Up & Going, Scope & Closures, this & Object Prototypes, Types & Grammar, Async & Performance, ES6 & Beyond*

[Exploring ES6](http://exploringjs.com/es6/index.html) by Axel Rauschmayer  
*Covers what’s new in ES6 (relative to ES5)*  
see also [Exploring ES2016 and ES2017](http://exploringjs.com/es2016-es2017/index.html), [Exploring ES2018 and ES2019](http://exploringjs.com/es2018-es2019/toc.html)

[JavaScript, the Good Parts](https://7chan.org/pr/src/OReilly_JavaScript_The_Good_Parts_May_2008.pdf) by Douglas Crockford  
see [here](https://www.reddit.com/r/ProgrammerHumor/comments/621qrt/javascript_the_good_parts/) (although a bit old, still interesting)

## Tutorials
[NodeSchool](https://nodeschool.io/)

[egghead](https://egghead.io/)

[udemy](https://www.udemy.com/)

[Pluralsight](https://www.pluralsight.com/)

[Frontend Masters](https://frontendmasters.com/)

[freeCodeCamp](https://www.freecodecamp.org/)

[coursera](https://www.coursera.org/)  

[Traversy Media on YouTube](https://www.youtube.com/user/TechGuyWeb)

## Practice

[app-ideas](https://github.com/florinpop17/app-ideas/)  
*A Collection of application ideas which can be used to improve your coding skills*

[edabit](https://edabit.com/challenges/javascript/)  
*Code challenges*

[#JavaScript30](https://javascript30.com/)  
*Build 30 things in 30 days with 30 tutorials*

[30 seconds of interviews](https://github.com/30-seconds/30-seconds-of-interviews)

## Job Searching

[AngelList](https://angel.co/)  
*Get a Job at a Startup*

[remoteOK](https://remoteok.io/)  
*Remote jobs. Also check out [nomadlist](https://nomadlist.com/)*

### Freelancing platforms

[malt](https://www.malt.com/)  

[upwork](https://www.upwork.com/)

[freelance.com](https://www.freelance.com/)  




## Open Source

[first-contributions](https://github.com/firstcontributions/first-contributions)  
*Hands-on tutorial that walks you through contributions workflow on github*

[Up For Grabs](https://up-for-grabs.net/#/)  
*List of issues reported in open source projects that the maintainers have identified as good projects to tackle for a beginner to the project*

## Tools

[Gitfolio](https://github.com/imfunniee/gitfolio/)  
*personal website + blog for every github user*`;
