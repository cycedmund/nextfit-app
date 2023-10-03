const User = require("../models/userModel");
const debug = require("debug")("nextfit:controllers:usersCtrl");

async function create(req, res) {
  try {
    debug("created new user: %o", req.body);
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    debug("Error creating: %s", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { create };

//* further improvements:
// 1. handle validation errors -> if err === "error string"
