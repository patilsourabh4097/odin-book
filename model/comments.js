const mongoose = require("mongoose");

let Comments = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  onPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Posts",
    required: true,
  },
  commentBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
module.exports = mongoose.model("Comments", Comments);
