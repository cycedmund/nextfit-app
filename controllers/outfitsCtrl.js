const Outfit = require("../models/outfitModel");
const debug = require("debug")("nextfit:controllers:outfitCtrl");

async function create(req, res) {
  debug("req.body: %o", req.body);
  const { apparels } = req.body;  //* save tops and bottoms from generated outfit
  debug("apparel", apparels);
  
  try {
    const newOutfit = await Outfit.create({
      apparels: apparels,
      user: req.user._id,
    });
    // const newOutfit = await Outfit.create(apparel);
    res.status(201).json({
      status: "success",
      data: {
        outfit: newOutfit,
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
    const outfits = await Outfit.find({ user: req.user._id });
    debug("found outfits by user: %o", outfits);
    res.status(200).json({
      status: "success",
      data: {
        outfits,
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

async function del(req, res) {
  debug("see req.params: %o", req.params);
  try {
    const outfit = await Outfit.findOneAndDelete({
      _id: req.params.outfitID,
      user: req.user._id,
    });
    debug("delete outfit by user: %o", outfit);
    res.status(200).json({ status: "success" });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Error deleting outfit",
      error: err,
    });
  }
}

async function showOne(req, res) {
  debug("see req.params: %o", req.params);
  try {
    const outfit = await Outfit.findOne({
      _id: req.params.outfitID,
      user: req.user._id,
    }).populate('apparels');
    debug("show outfit by user: %o", outfit);
    res.status(200).json({ status: "success" });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Error finding outfit",
      error: err,
    });
  }
}

module.exports = { create, getAll, del, showOne };
