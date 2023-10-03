const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/usersCtrl");

router.post("/", usersCtrl.create);

module.exports = router;
