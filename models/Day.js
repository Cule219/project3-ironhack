const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const daySchema = Schema({
  cards: [{
    type: Schema.Types.ObjectId,
    ref: "Card"
  }],
  githubRepo: [],
  module: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }],
  module: String,
  notes: String
}, 
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = mongoose.model('Day', daySchema);