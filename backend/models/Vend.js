const mongoose = require("mongoose");

let Vendor = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    rating: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  },
  {
    collection: "user2"
  }
);
module.exports = mongoose.model("Vendor", Vendor);
