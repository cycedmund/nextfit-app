const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const wardrobeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  fit: {
    type: String,
    required: true,
  },
  images: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = model("Apparel", wardrobeSchema);
