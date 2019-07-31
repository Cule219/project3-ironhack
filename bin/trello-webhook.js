/*this is going to have hardcoded board id, key and token
this should be changed once we have a form for admins*/

//trello uses post method for webhooks
//ex:
// $.post("https://api.trello.com/1/tokens/{APIToken}/webhooks/?key={APIKey}", {
//   description: "My first webhook",
//   callbackURL: "http://www.mywebsite.com/trelloCallback",
//   idModel: "4d5ea62fd76aa1136000000c",
// });

const boardId   = '5cf11e44887a4b72fbd8787b';//https://trello.com/b/JIVynIm1/reports.json
const APIToken  = '596e22c5d280793a5bd98c6883d6e1014fe4cc18b549f4fafbdd3a5947ed07ac';//31cb1def85d708d56c1c1244d61890c37726cc164a5bf87f313cf0db101944ac
const APIKey    = 'eb627225b1977b30f088094e7b793383';//a9428dfb03a4ad31c80bf8b7899df7cc
var Trello = require("node-trello");
var t = new Trello(APIKey, APIToken);

t.post(`https://api.trello.com/1/tokens/31cb1def85d708d56c1c1244d61890c37726cc164a5bf87f313cf0db101944ac/webhooks/`, 
 {
  key: APIKey,
  description: "Project 3 Webhook",
  callbackURL: "https://ironhack-berlin.herokuapp.com/trelloCallback",
  idModel: boardId
}, (err, att) => {
  console.log(err)
});


//curl method works

// curl -X POST -H "Content-Type: application/json" \
// https://api.trello.com/1/tokens/596e22c5d280793a5bd98c6883d6e1014fe4cc18b549f4fafbdd3a5947ed07ac/webhooks/ \
// -d '{
//   "key": "eb627225b1977b30f088094e7b793383",
//   "callbackURL": "https://ironhack-berlin.herokuapp.com/trelloCallback",
//   "idModel":"5cf11e44887a4b72fbd8787b",
//   "description": "Project 3 Webhook"  
// }'