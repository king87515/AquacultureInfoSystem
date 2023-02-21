const express = require("express");
const path = require("path");
const engine = require("ejs-mate");
const fs = require("fs");
const http = require("http");
const https = require("https");
const mongoose = require("mongoose");

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
//login related
const passport = require("passport"); // login 驗證
const session = require("express-session"); // 登入保持狀態
const flash = require("connect-flash");
const bcrypt = require("bcryptjs"); //加密
const schedule = require("node-schedule");

const record_json = require("./views_script/record_json_data/record_json");
const user_login = require("./models/user_login.js");
const connectMysql = require("./views_script/script/connectMysql");

const cors = require("cors");

require("dotenv/config");

// Initialization
const app = express();

// For certbot
const privateKey = fs.readFileSync(
  path.resolve(__dirname + "/xxx/privkey.pem")
);
const certificate = fs.readFileSync(
  path.resolve(__dirname + "/xxx/fullchain.pem")
);

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: certificate,
};

app.use(
  session({
    secret: "messecretkeyforthesession",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }, //1小時 //30 * 24 * 60 * 60 * 1000 : 30天
  })
);

app.use(passport.initialize());
app.use(passport.session());

// setting
app.set("port", process.env.PORT);

// console.log("__dirname:", __dirname);
app.set("views", path.join(__dirname, "views"));

app.engine("ejs", engine);
app.set("view engine", "ejs");

// https://vimsky.com/zh-tw/examples/usage/express-js-express-urlencoded-function.html
// 讓 post 在 postman可以正常運作
// fixed: nodejs express 413 playload too large error
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    parameterLimit: 200000,
    limit: "50mb",
    extended: true,
  })
);

//跨域處理
app.use(cors());
// app.all('*',function(req,res,next){
//     res.header('Access-Control-Allow-Origin','*');
//     res.header('Access-Control-Allow-Headers','Content-Type');
//     res.header('Access-Control-Allow-Methods','*');
//     // res.header('Content-Type','application/json;charset=utf-8');
//     next();
// });

app.use(cookieParser());

// routes
//// static files routes
app.use("/assets", express.static(__dirname + "/assets"));
app.use("/.well-known", express.static(__dirname + "/.well-known"));

//// ejs routes
app.use("/", require("./routes/PageController"));

//// viewsScript of ejs routes
app.use("/js", express.static(__dirname + "/views_script"));

//// database routes
app.use("/db", require("./routes/RoutesController"));

// Connect to MongoDB
/*
-----------------MongoDB 用戶權限-------------------------
Read：允許用戶讀取指定數據庫
readWrite：允許用戶讀寫指定數據庫
dbAdmin：允許用戶在指定數據庫中執行管理函數，如索引創建、刪除，查看統計或訪問system.profile
userAdmin：允許用戶向system.users集合寫入，可以找指定數據庫裡創建、刪除和管理用戶
clusterAdmin：只在admin數據庫中可用，賦予用戶所有分片和複製集相關函數的管理權限。
readAnyDatabase：只在admin數據庫中可用，賦予用戶所有數據庫的讀權限
readWriteAnyDatabase：只在admin數據庫中可用，賦予用戶所有數據庫的讀寫權限
userAdminAnyDatabase：只在admin數據庫中可用，賦予用戶所有數據庫的userAdmin權限
dbAdminAnyDatabase：只在admin數據庫中可用，賦予用戶所有數據庫的dbAdmin權限。
root：只在admin數據庫中可用。超級賬號，超級權限
*/
const db = process.env.DN_CONNECTION;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("\x1b[33m", "[MongoDB Connected] " + db, "\033[0m");

    // // 簡單的註冊使用者帳號-start
    // var userName = 'xxx',
    //     userPwd = 'xxx';

    // var hashPwd = await bcrypt.hash(userPwd, 10);

    // var newUser = new user_login({
    //     userName: userName,
    //     userPwd: hashPwd,
    //     createTime: Date.now(),
    // });

    // const savedNewUser = await newUser.save();
    // // 簡單的註冊使用者帳號-end

    var currentTime = new Date();
    currentTime =
      currentTime.getFullYear() +
      "/" +
      ("0" + (currentTime.getMonth() + 1)).slice(-2) +
      "/" +
      ("0" + currentTime.getDate()).slice(-2) +
      " " +
      ("0" + currentTime.getHours()).slice(-2) +
      ":" +
      ("0" + currentTime.getMinutes()).slice(-2) +
      ":" +
      ("0" + currentTime.getSeconds()).slice(-2);
    // "Initially" post json file to database
    // await record_json.json_data_setup();

    // // "schedule" update data to database
    // schedule.scheduleJob("0 */30 * * * *", async function () {
    //   console.log("資料庫資料定時檢查", currentTime);
    //   await connectMysql.DatabaseConnected();
    // });

    // //首次匯入資料
    // console.log("首次匯入資料", currentTime);
    // await connectMysql.DatabaseConnected();
  })
  .catch((err) => console.log(err));

app.use(
  bodyParser.urlencoded({
    parameterLimit: 200000,
    limit: "50mb",
    extended: true,
  })
);

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  // console.log("req.session:", req.session);
  // console.log("req.user:", req.user);
  res.locals.login = req.isAuthenticated();
  res.locals.user = req.user;
  res.locals.session = req.session;
  next();
});

require("./config/passport")(passport);

// http
//   .createServer(function (req, res) {
//     // http.createServer(app, function (req, res) {
//     // console.log("req.headers['host']:",  req.headers['host']);
//     // console.log("req.url:",  req.url);
//     // console.log("req:",  req);
//     // res.writeHead(200);
//     res.writeHead(301, {
//       Location: "https://" + req.headers["host"] + req.url,
//     });
//     res.end();
//   })
//   .listen(process.env.PORT, function () {
//     console.log("------------------------------------------------");
//     console.log(
//       "[SERVER] RUNNING WEB SEERVER IN " + app.get("port") + " PORT..."
//     );
//     console.log("------------------------------------------------");
//   });

// https.createServer(credentials, app).listen(443, function () {
//   console.log("running web server in " + app.get("port") + " port...");
// });

http
  .createServer(app, function (req, res) {
    res.writeHead(200);
    res.end();
  })
  .listen(process.env.PORT, function () {
    console.log("------------------------------------------------");
    console.log(
      "[SERVER] RUNNING WEB SEERVER IN " + app.get("port") + " PORT..."
    );
    console.log("------------------------------------------------");
  });
