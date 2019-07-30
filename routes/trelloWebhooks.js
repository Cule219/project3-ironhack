const express = require("express");
const router = express.Router();
const Card = require("../models/Card");
//these should probably be targeted at one point
const List = require("../models/List");
const Board = require("../models/Board");
const Module = require("../models/Module");

const TrelloResponse = require("../models/TrelloResponse");

router.post('/trelloCallback', (req, res) => {
  TrelloResponse.create({'response.action.id': req.body.action.id},{action: req.body.action}, {upsert: true})//action: req.body.action
  
  // action.type = createCard
  if(req.body.action.display.translationKey === "action_create_card") {
    Card.update({id: req.body.action.data.card.id},{
        id: req.body.action.data.card.id, 
        name: req.body.action.data.card.name, 
        shortLink: req.body.action.data.card.shortLink,
        idList: req.body.action.data.list.id
    }, {upsert: true}).then(card => {
        console.log(card);
    }) 
  }
  // action.type = updateCard
  else if(req.body.action.display.translationKey === "action_archived_card") {
    Card.deleteMany({id: req.body.action.data.card.id}).then(data => 
        console.log(data));
  }
  // action.type = addAttachmentToCard
  else if(req.body.action.display.translationKey === "action_add_attachment_to_card") {
      Card.findOneAndUpdate({id: req.body.action.data.card.id}, {$push: {attachments: req.body.action.data.attachment.url}})
  }
  // action.type = addLabelToCard
  else if(req.body.action.display.translationKey === "action_add_label_to_card") {
      Card.findOneAndUpdate({id: req.body.action.data.card.id}, 
        {$push: 
            {tags: {
                name: req.body.action.data.text,
                color: req.body.action.data.value
            }}})
  }
  res.status(200);
})

module.exports = router;


