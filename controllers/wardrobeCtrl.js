const Wardrobe = require("../models/wardrobeModel");
const debug = require("debug")("nextfit:controllers:apparelCtrl");

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
    res.status(201).json({
      status: "success",
      data: {
        apparel: newApparelItem,
      },
    });
  } catch (err) {
    debug("Error saving: %o", err);
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Error saving apparel",
      error: err,
    });
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

module.exports = { uploadImg, create, getAll };
