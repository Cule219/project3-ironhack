const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardSchema = Schema(
  {
    id: String, //Trello ID
    name: String,
    dateLastActivity: Date,
    desc: String,
    descData: Object,
    idBoard: {
      type: Schema.Types.ObjectId,
      ref: "Board"
    },
    idList: String,
    idLabels: [String], //tags 
    shortUrl: String,
    url: String,
    attachments: [String],
<<<<<<< HEAD
    attachmentName: String,
    completionStatus: {
=======
    completable: {
>>>>>>> development
      type: Boolean,
      default: true
    },
    tech: [String],
    tags: [{ name: String, color: String }]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

module.exports = mongoose.model("Card", cardSchema);
