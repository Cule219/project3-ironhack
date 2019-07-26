const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const lessonSchema = Schema({
  content: {
    type: Object,
  },
  module: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
}, 
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = mongoose.model('Lesson', lessonSchema);