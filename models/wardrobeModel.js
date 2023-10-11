const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const wardrobeSchema = new Schema(
  {
    mainCategory: {
      type: String,
      required: [true, "Please input a Main Category"],
      enum: ["Top", "Bottom", "Outerwear", "Overall"],
    },
    subCategory: {
      type: String,
      required: [true, "Please input a Sub Category"],
      enum: [
        "T-shirt",
        "Shirt",
        "Polo Shirt",
        "Singlet",
        "Hoodie",
        "Sweater",
        "Blouse",
        "Long Sleeve Shirt",
        "Pants",
        "Jeans",
        "Shorts",
        "Sweatpants",
        "Skirt",
        "Jacket",
        "Suit",
        "Jumpsuit",
        "Romper",
        "Dress",
      ],
    },
    fit: {
      type: String,
      required: [true, "Please input a Fit"],
      enum: ["Loose", "Regular", "Tight"],
    },
    wornFrequency: {
      type: Number,
      min: [0, "Worn frequency must be at least 0"],
      default: 0,
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
    toJSON: { virtuals: true },
  }
);

wardrobeSchema.virtual("s3ObjectID").get(function () {
  const deconstructedURL = this.imageURL.split("/");
  const s3ObjectID = deconstructedURL[deconstructedURL.length - 1];
  return s3ObjectID;
});

wardrobeSchema.methods.updateWornFrequencyCount = async function () {
  this.wornFrequency += 1;
  await this.save();
};

wardrobeSchema.statics.updateWornFrequency = async function (apparelIDs) {
  const apparelWithIDs = {};

  for (const apparelID of apparelIDs) {
    const apparel = await this.findById(apparelID);
    if (apparel) {
      await apparel.updateWornFrequencyCount();

      if (apparel.mainCategory === "Top") {
        apparelWithIDs.top = apparel;
      } else if (apparel.mainCategory === "Bottom") {
        apparelWithIDs.bottom = apparel;
      } else if (apparel.mainCategory === "Outerwear") {
        apparelWithIDs.outerwear = apparel;
      } else if (apparel.mainCategory === "Overall") {
        apparelWithIDs.overall = apparel;
      }
    }
  }
  return apparelWithIDs;
};

module.exports = model("Wardrobe", wardrobeSchema);
