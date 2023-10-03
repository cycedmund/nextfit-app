require("dotenv").config();
require("./config/database");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const debug = require("debug")("nextfit:server");

//* Routers
const usersRouter = require("./routes/usersRouter");

//* App
const app = express();

//* Middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));

//* Routes -> all routes to start with /api
app.use("/api/users", usersRouter);

//? This should be the last route -> this is for react router
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

//* Listener
const port = process.env.PORT || 3000;

app.listen(port, function () {
  debug(`Express app running on port ${port}`);
});
