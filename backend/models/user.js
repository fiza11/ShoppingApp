const mongoose = require("mongoose");
let User = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    num: {
      type: Number,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  {
    collection: "user1"
  }
);
module.exports = mongoose.model("User", User);
