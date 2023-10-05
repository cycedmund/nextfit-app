const express = require("express");
const router = express.Router();
const wardrobeCtrl = require("../controllers/wardrobeCtrl");
const uploadToS3 = require("../config/uploadToS3");

router.get("/", wardrobeCtrl.getAll);
router.post("/apparel/new/upload", uploadToS3, wardrobeCtrl.uploadImg);
router.post("/apparel/new", wardrobeCtrl.create);

module.exports = router;
