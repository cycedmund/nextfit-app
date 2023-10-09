const Outfit = require("../models/outfitModel");
const debug = require("debug")("nextfit:controllers:outfitCtrl");

async function create(req, res) {
  debug("req.body: %o", req.body);
  const outfitInfo = req.body;
  try {
    const newOutfitItem = await Outfit.create({
      ...outfitInfo,
      user: req.user._id,
    });
    res.status(201).json({
      status: "success",
      data: {
        outfit: newOutfitItem,
      },
    });
  } catch (err) {
    debug("Error saving: %o", err);
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Error saving outfit",
      error: err,
    });
  }
}

async function getAll(req, res) {
  debug("see req.user: %o", req.user);
  try {
    const apparel = await Wardrobe.find({ user: req.user._id });
    debug("found apparel by user: %o", apparel);
    res.status(200).json({
      status: "success",
      data: {
        apparel,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Error getting all apparel",
      error: err,
    });
  }
}

module.exports = { create, getAll };
