const mongoose = require("mongoose");

const prodsSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    authorID: { type: String, required: true },
    author: { type: String, required: true },
    body: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const prodsModel = mongoose.model("prod", prodsSchema);

module.exports = { prodsModel };
