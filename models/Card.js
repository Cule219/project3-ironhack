const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const cardSchema = Schema({
  description: String,
  urls: [String],
  completionStatus: {
    type: Boolean,
    default: false
  },
  technology: [String],
  TrelloId: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  day: {
    type: Schema.Types.ObjectId,
    ref: "Day"
  },
  tags: [String]
}, 
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = mongoose.model('Card', cardSchema);