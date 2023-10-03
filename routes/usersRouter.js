const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/usersCtrl");

router.post("/", usersCtrl.create);
router.post("/login", usersCtrl.login);

module.exports = router;
