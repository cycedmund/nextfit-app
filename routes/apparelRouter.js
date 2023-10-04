const express = require("express");
const router = express.Router();
const apparelCtrl = require("../controllers/apparelCtrl");

const uploadToS3 = require("../config/uploadToS3");

router.post("/upload", uploadToS3, apparelCtrl.uploadImg);

module.exports = router;
