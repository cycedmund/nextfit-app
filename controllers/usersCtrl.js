const User = require("../models/userModel");
const debug = require("debug")("nextfit:controllers:usersCtrl");

async function create(req, res) {
  debug("newUser: %o", req.body);
  const newUser = await User.create(req.body);
  res.json(newUser);
}

module.exports = { create };
