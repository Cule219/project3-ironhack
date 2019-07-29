const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const moduleSchema = new Schema({
  name: String,
  description: String,
  technicalSkills: [
    {
      skill: String,
      goals: String
    }
  ]
});

module.exports = mongoose.model("Module", moduleSchema);
