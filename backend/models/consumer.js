const mongoose = require("mongoose");

let Consumer = new mongoose.Schema(
  {
    email: {
      type: String,
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

module.exports = mongoose.model("Consumer", Consumer);
