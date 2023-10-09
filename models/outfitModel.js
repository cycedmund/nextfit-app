const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const outfitSchema = new Schema(
  {
    top: {
      type: Schema.Types.ObjectId,
      ref: "Wardrobe",
    },
    bottom: {
      type: Schema.Types.ObjectId,
      ref: "Wardrobe",
    },
    outerwear: {
      type: Schema.Types.ObjectId,
      ref: "Wardrobe",
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

module.exports = model("Outfit", outfitSchema);
