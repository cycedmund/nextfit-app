const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const debug = require("debug")("nextfit:controllers:usersCtrl");

async function create(req, res) {
  try {
    const newUser = await User.create(req.body);
    debug("created new user: %o", req.body);
    const token = createJWT(newUser);
    res.status(201).json({
      status: "success",
      data: {
        token: token,
      },
    });
  } catch (err) {
    debug("Error creating: %o", err);
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal Server Error",
      error: err,
    });
  }
}

async function login(req, res) {
  debug("login user body: %o", req.body);
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user === null) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    const token = createJWT(user);
    res.status(200).json({
      status: "success",
      data: {
        token: token,
      },
    });
  } catch (err) {
    debug("Error creating: %o", err);
    res.status(401).json({
      status: "error",
      code: 401,
      message: "Bad Credentials",
      error: err,
    });
  }
}

function checkToken(req, res) {
  debug("req.user: %o", req.user);
  res.json(req.user);
}

//* ===== Helper Functions ===== *//

function createJWT(user) {
  return jwt.sign({ user }, process.env.SECRET, { expiresIn: "24h" });
}

module.exports = { create, login, checkToken };
