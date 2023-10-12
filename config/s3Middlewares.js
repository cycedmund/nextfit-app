const AWS = require("aws-sdk");
const multer = require("multer");
const sharp = require("sharp");
const { Rembg } = require("rembg-node");
const debug = require("debug")("nextfit:config:uploadToS3");
const { v4: uuidv4 } = require("uuid");
const Wardrobe = require("../models/wardrobeModel");
const fs = require("fs");
const path = require("path");

const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const AWS_REGION = process.env.AWS_REGION;
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

const rembg = new Rembg({
  logging: true,
});

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
  region: AWS_REGION,
});

debug("s3 object: %o", s3);

const upload = multer({ storage: multer.memoryStorage() }).array("images", 10);

module.exports = {
  uploadToS3: function (req, res, next) {
    const randomIdx = (max) => Math.floor(Math.random() * max);
    const splitUUID = uuidv4().split("-");
    const uniqueID = splitUUID[randomIdx(2)] + "-" + splitUUID[randomIdx(4)];
    debug("generate uuid: %s", uniqueID);

    upload(req, res, async function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({ err, message: "Unable to upload" });
      }

      debug("received files in multer: %o", req.files);
      try {
        for (const file of req.files) {
          // const imagePath = path.join(
          //   __dirname,
          //   `../uploads/${file.originalname}`
          // );
          // fs.writeFileSync(imagePath, file.buffer);
          const input = sharp(file.buffer);
          const removedBackground = await rembg.remove(input);
          const resizedImage = await removedBackground
            .resize(250, 300, { fit: sharp.fit.fill })
            .flatten({ background: "#FBFBF9" })
            .toFormat("png")
            .png({ quality: 80 })
            .toBuffer();

          debug("processed image: %o", resizedImage);

          const params = {
            Bucket: AWS_BUCKET_NAME,
            Key: `${uniqueID}-${file.originalname.replace(
              /\.[^.]+$/,
              ".jpeg"
            )}`,
            Body: removedBackground,
            ContentType: "image/jpeg",
          };

          const processed = await s3.upload(params).promise();
          debug("uploaded process image: %o", processed);

          // fs.unlinkSync(imagePath);

          file.processedImage = {
            key: `${uniqueID}-${file.originalname.replace(
              /\.[^.]+$/,
              ".jpeg"
            )}`,
          };
        }

        return next();
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ error, message: "Error processing image" });
      }
    });
  },
  deleteFromS3: async function (req, res, next) {
    const apparelToDelete = await Wardrobe.findById(req.params.apparelID);
    debug("apparelToDelete: %o", apparelToDelete);
    const s3ObjectID = apparelToDelete.s3ObjectID;
    debug("s3ObjectID virtual:", s3ObjectID);

    const params = {
      Bucket: AWS_BUCKET_NAME,
      Key: s3ObjectID,
    };

    try {
      await s3.deleteObject(params).promise();
      debug("successfully deleted s3 object");
    } catch (err) {
      console.error(err);
      debug("error deleting from s3: %o", err);
      return res.status(500).json({ err, message: "Error deleting image" });
    }
    return next();
  },
};

// https://stackoverflow.com/questions/1818310/regular-expression-to-remove-a-files-extension

// https://medium.com/@mohandabdiche/how-to-upload-and-resize-an-image-in-a-vue-js-848a92b87076

// https://stackoverflow.com/questions/65465145/uploading-multiple-images-with-multer-to-aws-s3
