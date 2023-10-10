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
      min: 0,
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

wardrobeSchema.statics.updateWornFrequency = async function (
  topApparelID,
  bottomApparelID
) {
  const top = await this.findById(topApparelID);
  const bottom = await this.findById(bottomApparelID);
  await top.updateWornFrequencyCount();
  await bottom.updateWornFrequencyCount();
  return { top, bottom };
};

module.exports = model("Wardrobe", wardrobeSchema);
