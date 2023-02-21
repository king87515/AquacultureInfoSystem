var nodemailer = require("nodemailer");
// var xoauth2 = require('xoauth2');

// // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing
//   let testAccount = nodemailer.createTestAccount();

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: testAccount.user, // generated ethereal user
//       pass: testAccount.pass, // generated ethereal password
//     },
//   });

var transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "xxx@gmail.com",
    pass: "xxx",
  },
});

module.exports = {
  sendMail: async function (EmailTo, EmailTitle, EmailText) {
    var mailOptions = {
      from: "xxx@gmail.com",
      to: EmailTo,
      subject: EmailTitle,
      html: EmailText,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return "error!";
      } else {
        console.log("Email sent: " + info.response);
        return "success!";
      }
    });
  },
};
