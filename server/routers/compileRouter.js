const express = require("express");
const { cppCompile } = require("../controller/compileController");
const compileRouter = express.Router();
compileRouter.route("/cpp").post(cppCompile);
module.exports = compileRouter;
