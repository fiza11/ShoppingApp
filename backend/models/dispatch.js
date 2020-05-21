const mongoose = require("mongoose");

let Dispatch = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },

    name: {
      type: String,
      required: true
    },
    buyer: {
      type: String,
      required: true
    },
    review: {
      type: String,
      default: ""
    },
    Rating: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: "Dispatched"
    }
  },
  {
    collection: "user4"
  }
);

module.exports = mongoose.model("Dispatch", Dispatch);
