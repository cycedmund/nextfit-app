const debug = require("debug")("nextfit:controllers:apparelCtrl");

function uploadImg(req, res) {
  debug("files received: %o", req.files);
  res
    .status(201)
    .json({ message: "Image successfully uploaded to S3", files: req.files });
}

module.exports = { uploadImg };
