const Outfit = require("../models/outfitModel");
const debug = require("debug")("nextfit:controllers:outfitCtrl");
const sendResponse = require("../config/sendResponseHelper");

async function create(req, res) {
  debug("req.body: %o", req.body);
  const { top, bottom } = req.body;
  try {
    //* check if outfit combo already exist inside db
    const outfit = await Outfit.findOne({
      "apparels.top": top,
      "apparels.bottom": bottom,
    });
    if (outfit) throw new Error();

    const newOutfit = await Outfit.create({
      apparels: { top, bottom },
      user: req.user._id,
    });
    sendResponse(res, 201, { outfit: newOutfit });
  } catch (err) {
    debug("Error saving: %o", err);
    sendResponse(res, 500, null, "Error saving outfit.");
  }
}

async function getAll(req, res) {
  debug("see req.user: %o", req.user);
  try {
    const outfits = await Outfit.find({ user: req.user._id })
      .populate({ path: "apparels.top", model: "Wardrobe" })
      .populate({ path: "apparels.bottom", model: "Wardrobe" })
      .populate({ path: "apparels.outerwear", model: "Wardrobe" })
      .populate({ path: "apparels.overall", model: "Wardrobe" });
    debug("found outfits by user: %o", outfits);
    sendResponse(res, 200, { outfits });
  } catch (err) {
    sendResponse(res, 500, null, "Error getting all outfits.");
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
    sendResponse(res, 200);
  } catch (err) {
    sendResponse(res, 500, null, "Error deleting outfit.");
  }
}

module.exports = { create, getAll, del };
