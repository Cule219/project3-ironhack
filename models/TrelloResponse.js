const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trelloResponseSchema = Schema(
  {
    action: Object
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

module.exports = mongoose.model("TrelloResponse", trelloResponseSchema);
