const express = require("express");
const {
  cppCompile,
  javaCompile,
  javascriptCompile,
  pythonCompile,
} = require("../controller/compileController");
const compileRouter = express.Router();
compileRouter.route("/cpp").post(cppCompile);
compileRouter.route("/java").post(javaCompile);
compileRouter.route("/javascript").post(javascriptCompile);
compileRouter.route("/python").post(pythonCompile);
module.exports = compileRouter;
