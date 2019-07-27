const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const noteSchema = Schema({
  content: {
    type: String,
    min: 8
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  day: {
    type: Schema.Types.ObjectId,
    ref: "Day"
  },
  card: {
    type: Schema.Types.ObjectId,
    ref: "Card"
  }
}, 
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = mongoose.model('Note', noteSchema);