const nodemailer = require("nodemailer");

//to  send the mail based on the different conditions
module.exports.sendMail = async function sendMail(str, data) {
  console.log(str, "str");
  console.log(data, "data email");
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER, // generated ethereal user
      pass: process.env.GMAIL_PASS, // generated ethereal password
    },
  });
  var Osubject, Otext, Ohtml;
  if (str == "otp") {
    Osubject = "OTP to verify your email id with Code4Share";
    Ohtml = `<div
        class="container"
        style="max-width: 90%; margin: auto; padding-top: 20px"
      >
        <h2 style="text-align:"center">Welcome to the Code4Share.</h2>
        <h4>You are officially In ✔</h4>
        <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
        <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${data.otp}</h1>
   </div>`;
  }
  if (str == "forgotPassword") {
    Osubject = `OTP to reset password of your account with code4share`;
    Ohtml = `<div
        class="container"
        style="max-width: 90%; margin: auto; padding-top: 20px"
      >
        <h2 style="text-align:"center"> Code4Share.</h2>
        <p style="margin-bottom: 30px;">Pleas enter the reset password  OTP to update the password</p>
        <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${data.otp}</h1>
   </div>`;
  }
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Code4Share Code Editor " <code4share.official@gmail.com>', // sender address
    to: data.email, // list of receivers
    subject: Osubject, // Subject line
    html: Ohtml, // html body
  });
  console.log(info, "info");

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};
