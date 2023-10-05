const express = require("express");
const router = express.Router();
const apparelCtrl = require("../controllers/apparelCtrl");

const uploadToS3 = require("../config/uploadToS3");
// const ensureLoggedIn = require("../config/ensureLoggedIn");

router.post("/upload", uploadToS3, apparelCtrl.uploadImg);

module.exports = router;
