const mongoose = require("mongoose");

let Seller = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },

    sname: {
      type: String,
      required: true
    },
    sitem: {
      type: String,
      required: true
    },
    quan: {
      type: Number,
      required: true
    },
    remain: {
      type: Number
    },
    state: {
      type: String
      // default: "Waiting"
    }
  },
  {
    collection: "user3"
  }
);

module.exports = mongoose.model("Seller", Seller);
