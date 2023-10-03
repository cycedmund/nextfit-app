const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const debug = require("debug")("nextfit:controllers:usersCtrl");

async function create(req, res) {
  try {
    const newUser = await User.create(req.body);
    debug("created new user: %o", req.body);
    const token = createJWT(newUser);
    res.status(201).json(token);
  } catch (err) {
    debug("Error creating: %o", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function login(req, res) {
  debug("login user body: %o", req.body);
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    res.status(200).json(createJWT(user));
  } catch (err) {
    debug("Error creating: %o", err);
    res.status(401).json({ error: "Bad Credentials" });
  }
}

function checkToken(req, res) {
  debug("req.user: %o", req.user);
  res.json(req.user);
}

//* ===== Helper Functions ===== *//

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: "24h" }
  );
}

module.exports = { create, login, checkToken };
