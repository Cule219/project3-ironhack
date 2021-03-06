const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    profileImg: String,
    githubId: String,
    githubLink: String,
    role: {
      type: String,
      enum: ["student", "TA", "teacher"],
      default: "student"
    },
    completedItems: [String]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
