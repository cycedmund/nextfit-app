const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const outfitSchema = new Schema(
  {
    apparels: {
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
