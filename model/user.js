const mongoose = require("mongoose");

let User = new mongoose.Schema({
  firstname: String,
  lastname: String,
  username: String,
  password: String,
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("User", User);
