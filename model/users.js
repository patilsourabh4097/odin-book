const mongoose = require("mongoose");

let User = new mongoose.Schema({
  firstName: String,
  lastName: String,
  userName: String,
  password: String,
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("User", User);
