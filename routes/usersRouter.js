const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/usersCtrl");

//* require the authorization middleware function

router.post("/", usersCtrl.create);
router.post("/login", usersCtrl.login);
router.delete("/", usersCtrl.deactivate);

module.exports = router;
