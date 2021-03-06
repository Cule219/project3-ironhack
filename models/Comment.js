const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = Schema(
  {
    content: {
      type: String,
      min: 8
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    list: {
      type: Schema.Types.ObjectId,
      ref: "List"
    },
    module: {
      type: Schema.Types.ObjectId,
      ref: "Module"
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

module.exports = mongoose.model("Comment", commentSchema);
