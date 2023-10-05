const Wardrobe = require("../models/wardrobeModel");
const debug = require("debug")("nextfit:controllers:apparelCtrl");

const AWS_S3_OBJECT_URL = process.env.AWS_S3_OBJECT_URL;

function uploadImg(req, res) {
  debug("files received: %o", req.files);
  const { files } = req;
  const imgURLs = files.map((img) => {
    return `${AWS_S3_OBJECT_URL}/${img.key}`;
  });
  debug("image converted to url:", imgURLs);
  res
    .status(201)
    .json({ message: "Image successfully uploaded to S3", imageURLs: imgURLs });
}

async function create(req, res) {
  debug("req.body: %o", req.body);
  const { name, category, fit, images } = req.body;
  const apparelInfo = { name, category, fit, images };
  try {
    const newApparelItem = await Wardrobe.create({
      ...apparelInfo,
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

module.exports = { uploadImg, create };
