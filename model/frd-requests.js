const mongoose = require("mongoose");

let FrdRequest = new mongoose.Schema({
  requestBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  requestTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("FrdRequest", FrdRequest);
