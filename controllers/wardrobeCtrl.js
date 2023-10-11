const Wardrobe = require("../models/wardrobeModel");
const Outfit = require("../models/outfitModel");
const debug = require("debug")("nextfit:controllers:apparelCtrl");
const sendResponse = require("../config/sendResponseHelper");

const AWS_S3_OBJECT_URL = process.env.AWS_S3_OBJECT_URL;

function uploadImg(req, res) {
  debug("files received: %o", req.files);
  const { files } = req;
  const imgURLs = files.map((file) => {
    return `${AWS_S3_OBJECT_URL}/${file.processedImage.key}`;
  });
  debug("image converted to url:", imgURLs);
  res
    .status(201)
    .json({ message: "Image successfully uploaded to S3", imageURLs: imgURLs });
}

async function create(req, res) {
  debug("req.body: %o", req.body);
  const { mainCategory, subCategory, fit } = req.body;
  const apparelInfo = { mainCategory, subCategory, fit };
  try {
    const newApparelItem = await Wardrobe.create({
      ...apparelInfo,
      imageURL: req.body.images,
      user: req.user._id,
    });
    sendResponse(res, 201, {
      apparel: newApparelItem,
    });
  } catch (err) {
    debug("Error saving: %o", err);
    if (err.name === "ValidationError") {
      const errors = {};
      debug("Error saving errors:", err.errors);
      for (const field in err.errors) {
        errors[field] = err.errors[field].message;
      }
      return sendResponse(res, 400, null, errors);
    }
    sendResponse(res, 500, null, "Error saving apparel");
  }
}

async function getAll(req, res) {
  debug("see req.user: %o", req.user);
  try {
    const apparel = await Wardrobe.find({ user: req.user._id });
    debug("found apparel by user: %o", apparel);
    res.status(200).json({
      status: "success",
      data: {
        apparel,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Error getting all apparel",
      error: err,
    });
  }
}

async function del(req, res) {
  debug("see req.params: %o", req.params);
  try {
    // will return null if cannot findOne
    const category = req.params.main;
    if (category === "Top") {
      await Outfit.findOneAndDelete({ "apparels.top": req.params.apparelID });
    } else if (category === "Bottom") {
      await Outfit.findOneAndDelete({
        "apparels.bottom": req.params.apparelID,
      });
    }

    const apparel = await Wardrobe.findOneAndDelete({
      _id: req.params.apparelID,
      user: req.user._id,
    });
    debug("delete apparel by user: %o", apparel);
    res.status(200).json({ status: "success" });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Error deleting apparel",
      error: err,
    });
  }
}

async function updateOne(req, res) {
  debug("see req.user: %o", req.user);
  try {
    const updatedApparel = await Wardrobe.findByIdAndUpdate(
      { _id: req.params.apparelID },
      {
        mainCategory: req.body.mainCategory,
        subCategory: req.body.subCategory,
        fit: req.body.fit,
      },
      { new: true }
    );
    debug("found apparel by user: %o", updatedApparel);
    res.status(200).json({
      status: "success",
      data: {
        apparel: updatedApparel,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Error in editing particular apparel",
      error: err,
    });
  }
}

async function updateWornFreq(req, res) {
  const { apparelIDs } = req.body;
  try {
    const apparelWithIDs = await Wardrobe.updateWornFrequency(apparelIDs);
    res.status(200).json({
      status: "success",
      data: apparelWithIDs,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Error updating worn frequency",
      error: err,
    });
  }
}

module.exports = { uploadImg, create, getAll, del, updateOne, updateWornFreq };
