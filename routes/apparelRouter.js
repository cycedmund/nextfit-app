const express = require("express");
const router = express.Router();
const apparelCtrl = require("../controllers/apparelCtrl");

const uploadToS3 = require("../config/uploadToS3");
const ensureLoggedIn = require("../config/ensureLoggedIn");

router.post("/upload", ensureLoggedIn, uploadToS3, apparelCtrl.uploadImg);
router.post("/", ensureLoggedIn, apparelCtrl.create);

module.exports = router;
