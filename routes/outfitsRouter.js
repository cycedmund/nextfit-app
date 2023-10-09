const express = require("express");
const router = express.Router();
const outfitCtrl = require("../controllers/outfitsCtrl");

router.get("/", outfitCtrl.getAll);
router.post("/new", outfitCtrl.create);
router.delete("/:outfitID", outfitCtrl.del);

module.exports = router;
