const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = Schema(
  {
    id: String,
    closed: Boolean,
    idBoard: {
      type: Schema.Types.ObjectId,
      ref: "Board"
    },
    name: String,
    day: String,
    week: String,
    cards: [
      {
        type: Schema.Types.ObjectId,
        ref: "Card"
      }
    ],
    githubRepo: [String],
    module: {
      type: String
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment"
      }
    ],
    module: String,
    notes: String
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

module.exports = mongoose.model("List", listSchema);
