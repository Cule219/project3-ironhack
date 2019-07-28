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

// {

//   "id": "5cf11e44887a4b72fbd8787c",
//   "name": "Guidelines",
//   "closed": false,
//   "idBoard": "5cf11e44887a4b72fbd8787b",
//   "pos": 65535,
//   "subscribed": null,
//   "softLimit": null

// },
