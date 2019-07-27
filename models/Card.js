const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const cardSchema = Schema({
  id: String,//Trello ID
  name: String,
  dateLastActivity: Date,
  desc: String,
  descData: Object,
  idBoard: {
    type: Schema.Types.ObjectId,
    ref: 'Board'
  },
  idList: {
    type: Schema.Types.ObjectId,
    ref: "List"
  },
  idLabels: [String],//this needs to change
  shortUrl: String,
  url: String,
  completionStatus: {
    type: Boolean,
    default: false
  },
  technology: [String],
  tags: [String]
}, 
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = mongoose.model('Card', cardSchema);

