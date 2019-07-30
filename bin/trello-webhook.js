/*this is going to have hardcoded board id, key and token
this should be changed once we have a form for admins*/

//trello uses post method for webhooks
//ex:
// $.post("https://api.trello.com/1/tokens/{APIToken}/webhooks/?key={APIKey}", {
//   description: "My first webhook",
//   callbackURL: "http://www.mywebsite.com/trelloCallback",
//   idModel: "4d5ea62fd76aa1136000000c",
// });

const boardId   = 'JIVynIm1';
const APIToken  = '596e22c5d280793a5bd98c6883d6e1014fe4cc18b549f4fafbdd3a5947ed07ac';
const APIKey    = 'eb627225b1977b30f088094e7b793383';



const express = require("express");
const router = express.Router();

router.post(`https://api.trello.com/1/tokens/${APIToken}/webhooks/?key=${APIKey}`, {
  description: "Project 3 Webhook",
  callbackURL: "https://ironhack-berlin.herokuapp.com/trelloCallback",
  idModel: boardId
})