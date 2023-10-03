const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const debug = require("debug")("nextfit:controllers:usersCtrl");

async function create(req, res) {
  try {
    debug("created new user: %o", req.body);
    const newUser = await User.create(req.body);
    const token = createJWT(newUser);
    res.status(201).json(token);
  } catch (err) {
    debug("Error creating: %s", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

//* ===== Helper Function ===== *//

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: "24h" }
  );
}

module.exports = { create };

// TODO - further improvements:
// 1. handle validation errors -> if err === "error string"
