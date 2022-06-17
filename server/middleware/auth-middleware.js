const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

module.exports.authMiddleware = async (req, res, next) => {
  try {
    const { TOKEN } = req.cookies;
    if (!TOKEN) {
      return res.status(401).json({
        message: "Please login first",
      });
    }
    console.log(TOKEN);
    const { id } = jwt.verify(TOKEN, process.env.JWT_SECRET);
    console.log(id);
    req.user = await userModel.findById(id).select("-password");
    if (req.user) {
      next();
    } else {
      return res.status(401).json({
        message: "Not registered user",
      });
    }
  } catch (err) {
    return res.status(400).json({
      message: "Invalid token",
    });
  }
};
