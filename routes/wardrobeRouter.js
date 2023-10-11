const express = require("express");
const router = express.Router();
const wardrobeCtrl = require("../controllers/wardrobeCtrl");
const { uploadToS3, deleteFromS3, updateS3 } = require("../config/s3Middlewares");

router.get("/", wardrobeCtrl.getAll);
router.post("/new/upload", uploadToS3, wardrobeCtrl.uploadImg);
router.post("/new", wardrobeCtrl.create);
router.delete("/:apparelID/:main", deleteFromS3, wardrobeCtrl.del);
router.patch("/:apparelID/edit", wardrobeCtrl.updateOne);
router.patch("/frequency", wardrobeCtrl.updateWornFreq);

module.exports = router;
