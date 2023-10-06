const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const wardrobeSchema = new Schema(
  {
    mainCategory: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    fit: {
      type: String,
      required: true,
    },
    wornFrequency: {
      type: Number,
    },
    imageURL: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Wardrobe", wardrobeSchema);
