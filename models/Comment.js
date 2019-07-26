const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const commentSchema = Schema({
  content: {
    type: String,
    min: 8
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  lesson: {
    type: Schema.Types.ObjectId,
    ref: "Lesson"
  }
}, 
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = mongoose.model('Comment', commentSchema);