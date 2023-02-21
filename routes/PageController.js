const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const mongoose = require("mongoose");

const email = require("./mail");
const Notify = require("./Notify");
const reportFileConverter = require("./reportFileConverter");

const request = require("request");

const sub_status = require("../models/sub_status");

// ---------------------------------------------------------------------------------------
// GET
// ---------------------------------------------------------------------------------------
// Login Page
router.get("/", forwardAuthenticated, (req, res) => {
  res.render("login", { err: "false" });
  //res.sendFile(__dirname + "/" + "login.html");
});

// Login Page
router.get("/fail", forwardAuthenticated, (req, res) => {
  res.render("login", { err: "true" });
  //res.sendFile(__dirname + "/" + "login.html");
});

// Login Page
router.get("/login", forwardAuthenticated, (req, res) => {
  res.render("login", { err: "false" });
});

// Login
router.post("/login", (req, res, next) => {
  req.logOut(); //初始化登入判斷
  passport.authenticate("login", {
    successRedirect: "/index",
    failureRedirect: "/fail",
    failureFlash: false,
  })(req, res, next);
});

// Logout Page
router.get("/logout", async (req, res) => {
  console.log("logout");
  req.logout();
  res.redirect("/");
});

// Registered Page
router.get("/registered", async (req, res) => {
  res.render("registered", { host: "http://" + req.get("host") });
});

// Register post
router.post("/registered", async (req, res) => {});

// //// database routes
// router.use('/db', ensureAuthenticated, require('./RoutesController'));

//send email
router.post("/sendEmail", async (req, res) => {
  console.log("\x1b[37m", req.body.emailto);
  console.log("\x1b[37m", req.body.emailtitle);
  console.log("\x1b[37m", req.body.emailbody);
  try {
    var savedPost = await email.sendMail(
      req.body.emailto,
      req.body.emailtitle,
      req.body.emailbody
    );
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

//Report File Converter and Export xlsx.
router.post("/fileExport", async (req, res) => {
  // console.log("\x1b[37m", req.body.base64Data);
  // console.log("\x1b[37m", req.body.fileName);
  try {
    var savedPost = await reportFileConverter.fileGenerator(
      req.body.Label,
      req.body.imageData,
      req.body.fileName
    );
    // console.log("\x1b[37m", savedPost);
    res.json({ FileConverterName: req.body.fileName });
  } catch (err) {
    res.json({ message: err });
  }
});

//get fcm web notification
//API https://<domainName>/sendNotification?title=<Title>&body=<Message>&token=<Token>
router.get("/sendNotification", ensureAuthenticated, async (req, res) => {
  try {
    console.log("sendNotification by get");
    console.log(req.query.token, req.query.body, req.query.title);
    // await sendMsg(req.query.token, req.query.body, req.query.title);
    // res.redirect("/");
    var savedPost = await Notify.sendMsgToOne(
      req.query.token,
      req.query.body,
      req.query.title
    );
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

//video stream
// http://192.168.1.4:8080/stream
router.get("/stream", ensureAuthenticated, async (req, res) => {
  try {
    console.log("video stream ");
    res.render("video_stream", {
      host: "http://" + req.get("host"),
      user: req.user,
      url: "http://192.168.1.4:8080/stream",
    });
  } catch (err) {
    res.json({ message: err });
  }
});

// Index Page
router.get("/:pageId", ensureAuthenticated, async (req, res) => {
  // console.log(req.user);
  // console.log("req.params.pageId:",req.params.pageId);
  // console.log("req:",req);
  if (
    req.params.pageId != "favicon.ico" &&
    req.params.pageId != "js" &&
    req.params.pageId != "ico"
  )
    res.render(req.params.pageId, {
      host: "http://" + req.get("host"),
      user: req.user,
    });

});

function ensureAuthenticated(req, res, next) {
  // console.log("res:",res);
  // console.log(req.user);
  // console.log("req.isAuthenticated():", req.isAuthenticated());
  if (req.isAuthenticated()) {
    if (req.user != undefined) {
      // console.log("ensureAuthenticated next");
      // console.log("req:", req);
      return next();
    }
  }
  //req.flash('error_msg', 'Please log in to view that resource');
  res.redirect("/");
}

function forwardAuthenticated(req, res, next) {
  //console.log(req.isAuthenticated());
  if (!req.isAuthenticated()) {
    return next();
  }
  if (req.user != undefined) {
    res.redirect("/index");
  } else {
    req.logout();
    return next();
  }
}

function sendMsg(token, body, title) {
  var headers = {
    Authorization:
      "key=AAAA9EHpLoY:APA91bHkD5UExA5u7Ek6u2QGQUA0sysCUHv5Qzooh1CX0jr-ydF8l-eLoRn9mYu-U-nCbkbOBfW7hx-wRhi_EIRdlIApMtVQW4u0b3O-6_qESNzLaQrQTx471q7H88yHS4GknWtb5ILs",
    "Content-Type": "application/json",
  };

  var dataString = {
    notification: {
      title: title,
      body: body,
      icon: "",
      click_action: "https://google.com",
    },
    to: token,
  };

  var options = {
    url: "https://fcm.googleapis.com/fcm/send",
    method: "POST",
    headers: headers,
    body: JSON.stringify(dataString),
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    }
  }

  request(options, callback);
  return true;
}

module.exports = router;
