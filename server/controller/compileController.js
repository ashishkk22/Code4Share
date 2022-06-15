const axios = require("axios");
const { config } = require("dotenv");
module.exports.cppCompile = async function cppCompile(req, res) {
  let { input, code, fileName } = req.body;
  try {
    var dataMerge = {
      stdin: input,
      files: [
        {
          name: fileName,
          content: code,
        },
      ],
    };
    var configForApi = {
      url: process.env.baseURL + "cpp/latest",
      method: "post",
      data: dataMerge,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: "Token " + process.env.Authorization_Glot_Token,
      },
    };
    const resData = await axios(configForApi);
    if (!resData) {
      return res.status(400).json({
        message: "Network Error",
      });
    }
    return res.status(200).json({
      message: "code compiled successfully",
      data: resData.data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};
module.exports.javaCompile = async function javaCompile(req, res) {
  let { input, code, fileName } = req.body;
  try {
    var dataMerge = {
      stdin: input,
      files: [
        {
          name: fileName,
          content: code,
        },
      ],
    };
    var configForApi = {
      url: process.env.baseURL + "java/latest",
      method: "post",
      data: dataMerge,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: "Token " + process.env.Authorization_Glot_Token,
      },
    };
    const resData = await axios(configForApi);
    if (!resData) {
      return res.status(400).json({
        message: "Network Error",
      });
    }
    return res.status(200).json({
      message: "code compiled successfully",
      data: resData.data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};
module.exports.javascriptCompile = async function javascriptCompile(req, res) {
  let { input, code, fileName } = req.body;
  try {
    var dataMerge = {
      stdin: input,
      files: [
        {
          name: fileName,
          content: code,
        },
      ],
    };
    var configForApi = {
      url: process.env.baseURL + "javascript/latest",
      method: "post",
      data: dataMerge,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: "Token " + process.env.Authorization_Glot_Token,
      },
    };
    const resData = await axios(configForApi);
    if (!resData) {
      return res.status(400).json({
        message: "Network Error",
      });
    }
    return res.status(200).json({
      message: "code compiled successfully",
      data: resData.data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};
module.exports.pythonCompile = async function pythonCompile(req, res) {
  let { input, code, fileName } = req.body;
  try {
    var dataMerge = {
      stdin: input,
      files: [
        {
          name: fileName,
          content: code,
        },
      ],
    };
    var configForApi = {
      url: process.env.baseURL + "python/latest",
      method: "post",
      data: dataMerge,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: "Token " + process.env.Authorization_Glot_Token,
      },
    };
    const resData = await axios(configForApi);
    if (!resData) {
      return res.status(400).json({
        message: "Network Error",
      });
    }
    return res.status(200).json({
      message: "code compiled successfully",
      data: resData.data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};
