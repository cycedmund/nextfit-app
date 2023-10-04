const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const AWS_REGION = process.env.AWS_REGION;
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
  region: AWS_REGION,
});

const s3Bucket = multerS3({
  s3: s3,
  bucket: AWS_BUCKET_NAME,
  metadata: function (req, file, cb) {
    cb(null, { fieldname: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(null, Date.now().toString());
  },
});

const upload = multer({ storage: s3Bucket }).array("file", 4);

module.exports = function uploadToS3(req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).json({ err, message: "Unable to upload" });
    }
    return next();
  });
};
